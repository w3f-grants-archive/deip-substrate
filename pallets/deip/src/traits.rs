use crate::*;

use codec::HasCompact;
use sp_runtime::traits::AtLeast32BitUnsigned;
use deip_assets_error::*;

pub trait DeipAssetSystem<AccountId> {
    /// The units in which asset balances are recorded.
    type Balance: Member + Parameter + AtLeast32BitUnsigned + Default + Copy;

    /// The arithmetic type of asset identifier.
    type AssetId: Member + Parameter + Default + Copy + HasCompact;

    /// Returns `Some(project_id)` if it is secured with token specified by `id`.
    fn try_get_tokenized_project(id: &Self::AssetId) -> Option<ProjectId>;

    /// Tries to transfer assets specified by `security_tokens_on_sale` from
    /// `account` to a specific balance identified by `id`.
    /// Some collateral fee may be locked from `account`.
    fn transactionally_reserve(
        account: &AccountId,
        id: InvestmentId,
        security_tokens_on_sale: &[(Self::AssetId, Self::Balance)],
    ) -> Result<(), ReserveError<Self::AssetId>>;

    /// Transfers all assets currently owned by `id` to the account, used in
    /// transactionally_reserve, in a transactional way.
    fn transactionally_unreserve(id: InvestmentId) -> Result<(), UnreserveError<Self::AssetId>>;

    /// Transfers `amount` of assets `id` owned by account specified with `id` to `who`.
    fn transfer(
        id: InvestmentId,
        who: &AccountId,
        asset: Self::AssetId,
        amount: Self::Balance,
    ) -> Result<(), UnreserveError<Self::AssetId>>;
}
