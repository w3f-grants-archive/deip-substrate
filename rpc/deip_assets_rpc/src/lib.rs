use jsonrpc_core::{
    futures::future::{self, Future},
    futures::Stream,
    Error as RpcError, ErrorCode as RpcErrorCode,
};
use jsonrpc_derive::rpc;

use std::vec::Vec;

use codec::{Codec, Decode, Encode};

use sp_runtime::traits::Block as BlockT;

use sp_core::storage::StorageKey;

use frame_support::{Blake2_128Concat, ReversibleStorageHasher, StorageHasher};

mod types;
use types::*;

mod error;
use error::*;

pub type FutureResult<T> = Box<dyn Future<Item = T, Error = RpcError> + Send>;

fn prefix(pallet: &[u8], value_or_map: &[u8]) -> ([u8; 16], [u8; 16]) {
    use sp_core::hashing::twox_128;
    (twox_128(pallet), twox_128(value_or_map))
}

#[rpc]
pub trait DeipAssetsRpc<BlockHash, AssetId, Balance, AccountId, DepositBalance>
where
    AssetId: Encode,
    Balance: Decode,
    AccountId: Decode,
    DepositBalance: Decode + Default,
{
    #[rpc(name = "assets_getAsset")]
    fn get_asset(
        &self,
        at: Option<BlockHash>,
        id: AssetId,
    ) -> FutureResult<Option<AssetDetails<Balance, AccountId, DepositBalance>>>;

    #[rpc(name = "assets_getAssetList")]
    fn get_asset_list(
        &self,
        at: Option<BlockHash>,
        count: u32,
        start_id: Option<AssetId>,
    ) -> FutureResult<Vec<AssetDetailsWithId<AssetId, Balance, AccountId, DepositBalance>>>;

    #[rpc(name = "assets_getAssetBalanceList")]
    fn get_asset_balance_list(
        &self,
        at: Option<BlockHash>,
        count: u32,
        start_id: Option<(AssetId, AccountId)>,
    ) -> FutureResult<Vec<AssetBalanceWithIds<AssetId, Balance, AccountId>>>;

    #[rpc(name = "assets_getAssetBalanceByOwner")]
    fn get_asset_balance_by_owner(
        &self,
        at: Option<BlockHash>,
        owner: AccountId,
        asset: AssetId,
    ) -> FutureResult<Option<AssetBalance<Balance>>>;

    #[rpc(name = "assets_getAssetBalanceListByAsset")]
    fn get_asset_balance_list_by_asset(
        &self,
        at: Option<BlockHash>,
        asset: AssetId,
        count: u32,
        start_id: Option<AccountId>,
    ) -> FutureResult<Vec<AssetBalanceWithOwner<Balance, AccountId>>>;
}

pub struct DeipAssetsRpcObj<State, B> {
    state: State,
    _marker: std::marker::PhantomData<B>,
}

impl<State, B> DeipAssetsRpcObj<State, B> {
    pub fn new(state: State) -> Self {
        Self {
            state,
            _marker: Default::default(),
        }
    }
}

type HashOf<T> = <T as BlockT>::Hash;

impl<State, Block, AssetId, Balance, AccountId, DepositBalance>
    DeipAssetsRpc<HashOf<Block>, AssetId, Balance, AccountId, DepositBalance>
    for DeipAssetsRpcObj<State, Block>
where
    AssetId: 'static + Codec + Send,
    Balance: 'static + Decode + Send,
    AccountId: 'static + Codec + Send,
    DepositBalance: 'static + Encode + Decode + Send + Default,
    State: sc_rpc_api::state::StateApi<HashOf<Block>>,
    Block: BlockT,
{
    fn get_asset(
        &self,
        at: Option<HashOf<Block>>,
        id: AssetId,
    ) -> FutureResult<Option<AssetDetails<Balance, AccountId, DepositBalance>>> {
        let (pallet, map) = prefix(b"Assets", b"Asset");

        let key = StorageKey(
            pallet
                .iter()
                .chain(&map)
                .chain(&id.using_encoded(Blake2_128Concat::hash))
                .map(|b| *b)
                .collect(),
        );

        let state = &self.state;
        Box::new(
            state
                .storage(key, at)
                .map_err(|e| to_rpc_error(Error::ScRpcApiError, Some(format!("{:?}", e))))
                .and_then(|d| match d {
                    None => future::ok(None),
                    Some(data) => {
                        match AssetDetails::<Balance, AccountId, DepositBalance>::decode(
                            &mut &data.0[..],
                        ) {
                            Err(_) => future::err(to_rpc_error(
                                Error::AssetDetailsDecodeFailed,
                                Some(format!("{:?}", data)),
                            )),
                            Ok(details) => future::ok(Some(details)),
                        }
                    }
                }),
        )
    }

    fn get_asset_list(
        &self,
        at: Option<HashOf<Block>>,
        count: u32,
        start_id: Option<AssetId>,
    ) -> FutureResult<Vec<AssetDetailsWithId<AssetId, Balance, AccountId, DepositBalance>>> {
        let (pallet, map) = prefix(b"Assets", b"Asset");

        let start_key = start_id.map(|id| {
            StorageKey(
                pallet
                    .iter()
                    .chain(&map)
                    .chain(&id.using_encoded(Blake2_128Concat::hash))
                    .map(|b| *b)
                    .collect(),
            )
        });

        let state = &self.state;
        let keys = match state
            .storage_keys_paged(
                Some(StorageKey([pallet, map].concat().to_vec())),
                count,
                start_key,
                at,
            )
            .wait()
        {
            Ok(k) => k,
            Err(e) => {
                return Box::new(future::err(to_rpc_error(
                    Error::ScRpcApiError,
                    Some(format!("{:?}", e)),
                )))
            }
        };
        if keys.is_empty() {
            return Box::new(future::ok(vec![]));
        }

        let key_futures: Vec<_> = keys
            .into_iter()
            .map(|k| {
                state
                    .storage(k.clone(), at)
                    .map(|v| (k, v))
                    .map_err(|e| to_rpc_error(Error::ScRpcApiError, Some(format!("{:?}", e))))
            })
            .collect();

        let result = Vec::with_capacity(key_futures.len());
        Box::new(
            jsonrpc_core::futures::stream::futures_ordered(key_futures.into_iter()).fold(
                result,
                |mut result, kv| {
                    let (key, value) = kv;
                    let data = match value {
                        None => return future::ok(result),
                        Some(d) => d,
                    };

                    let no_prefix = Blake2_128Concat::reverse(&key.0[32..]);
                    let id = match AssetId::decode(&mut &no_prefix[..]) {
                        Err(_) => {
                            return future::err(to_rpc_error(
                                Error::AssetIdDecodeFailed,
                                Some(format!("{:?}", &key.0)),
                            ))
                        }
                        Ok(id) => id,
                    };

                    match AssetDetails::<Balance, AccountId, DepositBalance>::decode(
                        &mut &data.0[..],
                    ) {
                        Err(_) => future::err(to_rpc_error(
                            Error::AssetDetailsDecodeFailed,
                            Some(format!("{:?}", data)),
                        )),
                        Ok(details) => {
                            result.push(AssetDetailsWithId { id, details });
                            future::ok(result)
                        }
                    }
                },
            ),
        )
    }

    fn get_asset_balance_list(
        &self,
        at: Option<HashOf<Block>>,
        count: u32,
        start_id: Option<(AssetId, AccountId)>,
    ) -> FutureResult<Vec<AssetBalanceWithIds<AssetId, Balance, AccountId>>> {
        let (pallet, map) = prefix(b"Assets", b"Account");

        let start_key = start_id.map(|(first, second)| {
            StorageKey(
                pallet
                    .iter()
                    .chain(&map)
                    .chain(&first.using_encoded(Blake2_128Concat::hash))
                    .chain(&second.using_encoded(Blake2_128Concat::hash))
                    .map(|b| *b)
                    .collect(),
            )
        });

        let state = &self.state;
        let keys = match state
            .storage_keys_paged(
                Some(StorageKey([pallet, map].concat().to_vec())),
                count,
                start_key,
                at,
            )
            .wait()
        {
            Ok(k) => k,
            Err(e) => {
                return Box::new(future::err(to_rpc_error(
                    Error::ScRpcApiError,
                    Some(format!("{:?}", e)),
                )))
            }
        };
        if keys.is_empty() {
            return Box::new(future::ok(vec![]));
        }

        let key_futures: Vec<_> = keys
            .into_iter()
            .map(|k| {
                state
                    .storage(k.clone(), at)
                    .map(|v| (k, v))
                    .map_err(|e| to_rpc_error(Error::ScRpcApiError, Some(format!("{:?}", e))))
            })
            .collect();

        let result = Vec::with_capacity(key_futures.len());
        Box::new(
            jsonrpc_core::futures::stream::futures_ordered(key_futures.into_iter()).fold(
                result,
                |mut result, kv| {
                    let (key, value) = kv;
                    let data = match value {
                        None => return future::ok(result),
                        Some(d) => d,
                    };

                    let no_prefix = Blake2_128Concat::reverse(&key.0[32..]);
                    let asset = match AssetId::decode(&mut &no_prefix[..]) {
                        Err(_) => {
                            return future::err(to_rpc_error(
                                Error::AssetIdDecodeFailed,
                                Some(format!("{:?}", &key.0)),
                            ))
                        }
                        Ok(id) => id,
                    };

                    let no_prefix = Blake2_128Concat::reverse(&no_prefix[asset.encoded_size()..]);
                    let account = match AccountId::decode(&mut &no_prefix[..]) {
                        Err(_) => {
                            return future::err(to_rpc_error(
                                Error::AccountIdDecodeFailed,
                                Some(format!("{:?}", &key.0)),
                            ))
                        }
                        Ok(id) => id,
                    };

                    match AssetBalance::<Balance>::decode(&mut &data.0[..]) {
                        Err(_) => future::err(to_rpc_error(
                            Error::AssetBalanceDecodeFailed,
                            Some(format!("{:?}", data)),
                        )),
                        Ok(balance) => {
                            result.push(AssetBalanceWithIds {
                                asset,
                                account,
                                balance,
                            });
                            future::ok(result)
                        }
                    }
                },
            ),
        )
    }

    fn get_asset_balance_by_owner(
        &self,
        at: Option<HashOf<Block>>,
        owner: AccountId,
        asset: AssetId,
    ) -> FutureResult<Option<AssetBalance<Balance>>> {
        let (pallet, map) = prefix(b"Assets", b"Account");

        let key = StorageKey(
            pallet
                .iter()
                .chain(&map)
                .chain(&asset.using_encoded(Blake2_128Concat::hash))
                .chain(&owner.using_encoded(Blake2_128Concat::hash))
                .map(|b| *b)
                .collect(),
        );

        let state = &self.state;
        Box::new(
            state
                .storage(key, at)
                .map_err(|e| to_rpc_error(Error::ScRpcApiError, Some(format!("{:?}", e))))
                .and_then(|d| match d {
                    None => future::ok(None),
                    Some(data) => match AssetBalance::<Balance>::decode(&mut &data.0[..]) {
                        Err(_) => future::err(to_rpc_error(
                            Error::AssetBalanceDecodeFailed,
                            Some(format!("{:?}", data)),
                        )),
                        Ok(balance) => future::ok(Some(balance)),
                    },
                }),
        )
    }

    fn get_asset_balance_list_by_asset(
        &self,
        at: Option<HashOf<Block>>,
        asset: AssetId,
        count: u32,
        start_id: Option<AccountId>,
    ) -> FutureResult<Vec<AssetBalanceWithOwner<Balance, AccountId>>> {
        let (pallet, map) = prefix(b"Assets", b"Account");

        let asset_encoded = asset.encode();
        let asset_encoded_size = asset_encoded.len();
        let asset_hashed = Blake2_128Concat::hash(&asset_encoded);
        let start_key = start_id.map(|account_id| {
            StorageKey(
                pallet
                    .iter()
                    .chain(&map)
                    .chain(&asset_hashed)
                    .chain(&account_id.using_encoded(Blake2_128Concat::hash))
                    .map(|b| *b)
                    .collect(),
            )
        });

        let prefix = pallet
            .iter()
            .chain(&map)
            .chain(&asset_hashed)
            .map(|b| *b)
            .collect();

        let state = &self.state;
        let keys = match state
            .storage_keys_paged(
                Some(StorageKey(prefix)),
                count,
                start_key,
                at,
            )
            .wait()
        {
            Ok(k) => k,
            Err(e) => {
                return Box::new(future::err(to_rpc_error(
                    Error::ScRpcApiError,
                    Some(format!("{:?}", e)),
                )))
            }
        };
        if keys.is_empty() {
            return Box::new(future::ok(vec![]));
        }

        let key_futures: Vec<_> = keys
            .into_iter()
            .map(|k| {
                state
                    .storage(k.clone(), at)
                    .map(|v| (k, v))
                    .map_err(|e| to_rpc_error(Error::ScRpcApiError, Some(format!("{:?}", e))))
            })
            .collect();

        let result = Vec::with_capacity(key_futures.len());
        Box::new(
            jsonrpc_core::futures::stream::futures_ordered(key_futures.into_iter()).fold(
                result,
                move |mut result, kv| {
                    let (key, value) = kv;
                    let data = match value {
                        None => return future::ok(result),
                        Some(d) => d,
                    };

                    let no_prefix = Blake2_128Concat::reverse(&key.0[32..]);
                    let no_prefix = Blake2_128Concat::reverse(&no_prefix[asset_encoded_size..]);
                    let account = match AccountId::decode(&mut &no_prefix[..]) {
                        Err(_) => {
                            return future::err(to_rpc_error(
                                Error::AccountIdDecodeFailed,
                                Some(format!("{:?}", &key.0)),
                            ))
                        }
                        Ok(id) => id,
                    };

                    match AssetBalance::<Balance>::decode(&mut &data.0[..]) {
                        Err(_) => future::err(to_rpc_error(
                            Error::AssetBalanceDecodeFailed,
                            Some(format!("{:?}", data)),
                        )),
                        Ok(balance) => {
                            result.push(AssetBalanceWithOwner {
                                account,
                                balance,
                            });
                            future::ok(result)
                        }
                    }
                },
            ),
        )
    }
}
