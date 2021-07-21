use crate::*;

use sp_runtime::{traits::Saturating, SaturatedConversion};

/// Unique ProjectTokenSale ID reference
pub type Id = H160;

#[derive(Encode, Decode, Clone, Copy, RuntimeDebug, PartialEq, Eq, PartialOrd, Ord)]
#[cfg_attr(feature = "std", derive(Serialize, Deserialize))]
#[cfg_attr(feature = "std", serde(rename_all = "camelCase"))]
pub enum Status {
    Active,
    Finished,
    Expired,
    Inactive,
}

impl Default for Status {
    fn default() -> Self {
        Status::Inactive
    }
}

/// Contains information about tokens of the project
#[derive(Encode, Decode, Default)]
pub struct TokenInfo {
    pub total: u64,
    pub reserved: u64,
}

/// The object represents a sale of project's tokens with
/// various parameters.
/// It is connected to the specific project.
#[derive(Encode, Decode, Clone, Default, RuntimeDebug, PartialEq, Eq)]
#[cfg_attr(feature = "std", derive(Serialize, Deserialize))]
#[cfg_attr(feature = "std", serde(rename_all = "camelCase"))]
pub struct Info<Moment, Balance> {
    /// Reference for external world and uniques control
    pub external_id: Id,
    /// Reference to the Project
    pub project_id: ProjectId,
    /// When the sale starts
    pub start_time: Moment,
    /// When it supposed to end
    pub end_time: Moment,
    pub status: Status,
    /// How many contributions already reserved
    pub total_amount: Balance,
    pub soft_cap: Balance,
    pub hard_cap: Balance,
    /// How many tokens supposed to sale
    pub security_tokens_on_sale: u64,
}

impl<T: Config> Module<T> {
    pub(super) fn create_project_token_sale_impl(
        account: T::AccountId,
        external_id: Id,
        project_id: ProjectId,
        start_time: T::Moment,
        end_time: T::Moment,
        soft_cap: BalanceOf<T>,
        hard_cap: BalanceOf<T>,
        security_tokens_on_sale: u64,
    ) -> DispatchResult {
        ensure!(
            !ProjectTokenSaleMap::<T>::contains_key(external_id),
            Error::<T>::TokenSaleAlreadyExists
        );

        let timestamp = pallet_timestamp::Module::<T>::get();
        ensure!(
            start_time >= timestamp,
            Error::<T>::TokenSaleStartTimeMustBeLaterOrEqualCurrentMoment
        );
        ensure!(
            end_time > start_time,
            Error::<T>::TokenSaleEndTimeMustBeLaterStartTime
        );

        ensure!(
            soft_cap > 0u32.into(),
            Error::<T>::TokenSaleSoftCapShouldBePositive
        );
        ensure!(
            hard_cap >= soft_cap,
            Error::<T>::TokenSaleHardCapShouldBeGreaterOrEqualSoftCap
        );

        let projects = Projects::<T>::get();
        match projects.binary_search_by_key(&project_id, |&(p, _)| p) {
            Ok(index) => {
                if projects[index].1 != account {
                    return Err(Error::<T>::ProjectNotBelongToTeam.into());
                }
            }
            Err(_) => return Err(Error::<T>::NoSuchProject.into()),
        }

        let mut token_sales = ProjectTokenSaleByProjectIdStatus::get();
        if let Ok(_) = token_sales.binary_search_by_key(
            &(project_id, ProjectTokenSaleStatus::Active),
            |&(p, s, _)| (p, s),
        ) {
            return Err(Error::<T>::TokenSaleScheduledAlready.into());
        }

        let index = match token_sales.binary_search_by_key(
            &(project_id, ProjectTokenSaleStatus::Inactive),
            |&(p, s, _)| (p, s),
        ) {
            Ok(_) => return Err(Error::<T>::TokenSaleScheduledAlready.into()),
            Err(i) => i,
        };

        let new_project_token_sale = ProjectTokenSale {
            external_id: external_id,
            project_id: project_id,
            start_time: start_time,
            end_time: end_time,
            status: ProjectTokenSaleStatus::Inactive,
            soft_cap: soft_cap,
            hard_cap: hard_cap,
            security_tokens_on_sale: security_tokens_on_sale,
            ..Default::default()
        };

        ProjectTokens::mutate_exists(project_id, |maybe_project| -> DispatchResult {
            let project = maybe_project.as_mut().ok_or(Error::<T>::NoSuchProject)?;

            let new_total = project
                .total
                .checked_sub(security_tokens_on_sale)
                .ok_or(Error::<T>::TokenSaleBalanceIsNotEnough)?;
            let new_reserved = project
                .reserved
                .checked_add(security_tokens_on_sale)
                .ok_or(Error::<T>::TokenSaleProjectReservedOverflow)?;

            project.total = new_total;
            project.reserved = new_reserved;

            Ok(())
        })?;

        token_sales.insert(
            index,
            (project_id, ProjectTokenSaleStatus::Inactive, external_id),
        );
        ProjectTokenSaleByProjectIdStatus::put(token_sales);
        ProjectTokenSaleMap::<T>::insert(external_id, new_project_token_sale.clone());
        ProjectTokenSaleEndTimes::<T>::mutate(|v| {
            let index = match v.binary_search_by_key(&end_time, |&(e, _)| e) {
                Ok(i) => i,
                Err(i) => i,
            };
            v.insert(index, (end_time, external_id));
        });

        Self::deposit_event(RawEvent::ProjectTokenSaleCreated(
            project_id,
            new_project_token_sale,
        ));

        Ok(())
    }

    pub(super) fn process_project_token_sales() {
        let now = pallet_timestamp::Module::<T>::get();

        let mut token_sales_by_end_time = ProjectTokenSaleEndTimes::<T>::get();
        let i = token_sales_by_end_time.partition_point(|&(e, _)| e <= now);
        for (_, sale_id) in token_sales_by_end_time.drain(..i) {
            let sale = ProjectTokenSaleMap::<T>::get(sale_id);
            if !matches!(sale.status, ProjectTokenSaleStatus::Active) {
                continue;
            }

            if sale.total_amount < sale.soft_cap {
                Self::update_status(&sale, ProjectTokenSaleStatus::Expired);
                Self::refund_project_token_sale(&sale);
            } else if sale.total_amount >= sale.soft_cap {
                Self::update_status(&sale, ProjectTokenSaleStatus::Finished);
                Self::finish_project_token_sale(&sale);
            }
        }

        let token_sales_by_end_time = token_sales_by_end_time;
        for (_, sale_id) in token_sales_by_end_time.iter() {
            let sale = ProjectTokenSaleMap::<T>::get(sale_id);
            if matches!(sale.status, ProjectTokenSaleStatus::Inactive) {
                Self::update_status(&sale, ProjectTokenSaleStatus::Active);
                Self::deposit_event(RawEvent::ProjectTokenSaleActivated(sale.project_id, *sale_id));
            }
        }

        ProjectTokenSaleEndTimes::<T>::put(token_sales_by_end_time);
    }

    fn update_status(sale: &ProjectTokenSaleOf<T>, new_status: ProjectTokenSaleStatus) {
        ProjectTokenSaleMap::<T>::mutate_exists(sale.external_id, |maybe_sale| -> () {
            let sale = maybe_sale.as_mut().expect("we keep collections in sync");
            sale.status = new_status;
        });

        let mut token_sales = ProjectTokenSaleByProjectIdStatus::get();
        match new_status {
            ProjectTokenSaleStatus::Finished
            | ProjectTokenSaleStatus::Expired
            | ProjectTokenSaleStatus::Active => {
                let old_index = token_sales
                    .binary_search_by_key(&(sale.project_id, sale.status), |&(p, t, _)| (p, t))
                    .expect("we keep collections in sync");
                token_sales.remove(old_index);

                let index = match token_sales
                    .binary_search_by_key(&(sale.project_id, new_status), |&(p, t, _)| (p, t))
                {
                    Ok(i) => i,
                    Err(i) => i,
                };

                token_sales.insert(index, (sale.project_id, new_status, sale.external_id));
                ProjectTokenSaleByProjectIdStatus::put(token_sales);
            }
            _ => (),
        }
    }

    fn refund_project_token_sale(sale: &ProjectTokenSaleOf<T>) {
        ProjectTokens::mutate_exists(sale.project_id, |maybe_project| {
            let token_info = maybe_project.as_mut().expect("we keep collections in sync");

            let restored_total = token_info
                .total
                .checked_add(token_info.reserved)
                .expect("reserved + total can't exceed u64");

            token_info.total = restored_total;
            token_info.reserved = 0;
        });

        let contributors = ProjectTokenSaleContributionIndex::<T>::get(sale.external_id);
        for contribution in contributors {
            T::Currency::unreserve(&contribution.0, contribution.1);
        }

        ProjectTokenSaleContributionIndex::<T>::remove(sale.external_id);
        Self::deposit_event(RawEvent::ProjectTokenSaleExpired(sale.project_id, sale.external_id));
    }

    fn finish_project_token_sale(sale: &ProjectTokenSaleOf<T>) {
        ProjectTokens::mutate_exists(sale.project_id, |maybe_project| {
            let token_info = maybe_project.as_mut().expect("we keep collections in sync");
            token_info.reserved = 0;
        });

        let contributors = ProjectTokenSaleContributionIndex::<T>::get(sale.external_id);
        let mut iter = contributors.iter();

        let first_contribution = iter
            .next()
            .expect("Token sale is about to finish, but there are no contributors?");

        let mut total_token_amount: u64 = 0;
        for contribution in iter {
            T::Currency::repatriate_reserved(
                &contribution.0,
                &ProjectMap::<T>::get(sale.project_id).team_id,
                contribution.1,
                frame_support::traits::BalanceStatus::Free,
            )
            .expect("Corresponding amount should be reserved earlier");

            // similiar to frame_support::traits::Imbalance::ration
            let token_amount = contribution
                .1
                .saturating_mul(sale.security_tokens_on_sale.saturated_into())
                / sale.total_amount;
            let token_amount: u64 = token_amount.saturated_into();
            total_token_amount += token_amount;

            OwnedProjectTokens::<T>::insert(contribution.0.clone(), sale.project_id, token_amount);
        }

        // process the remainder
        OwnedProjectTokens::<T>::insert(
            first_contribution.0.clone(),
            sale.project_id,
            sale.security_tokens_on_sale - total_token_amount,
        );

        ProjectTokenSaleContributionIndex::<T>::remove(sale.external_id);

        Self::deposit_event(RawEvent::ProjectTokenSaleFinished(sale.project_id, sale.external_id));
    }
}
