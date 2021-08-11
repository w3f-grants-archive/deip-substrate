use crate::actor::*;
use super::actor_io::*;

use substrate_subxt::{Client, ChainBlock};
use substrate_subxt::System;
use jsonrpsee_ws_client::Subscription;

use crate::RuntimeT;

pub struct BlockchainActor {
    client: Client<RuntimeT>,
}
impl BlockchainActor {
    pub fn new(client: Client<RuntimeT>) -> Self {
        Self { client }
    }
}

pub enum BlockchainActorInputData {
    SubscribeFinalizedBlocks,
    GetBlockHash(<RuntimeT as System>::BlockNumber),
    GetBlock(<RuntimeT as System>::Hash)
}
impl BlockchainActorInputData {
    pub fn subscribe_finalized_blocks() -> BlockchainActorInput {
        ActorDirective::Input(Self::SubscribeFinalizedBlocks)
    }
}
pub type BlockchainActorInput = ActorDirective<BlockchainActorInputData>;
pub enum BlockchainActorOutput {
    SubscribeFinalizedBlocks(Result<Subscription<<RuntimeT as System>::Header>, substrate_subxt::Error>),
    GetBlockHash(Result<Option<<RuntimeT as System>::Hash>, substrate_subxt::Error>),
    GetBlock(Result<Option<ChainBlock<RuntimeT>>, substrate_subxt::Error>),
}
pub type BlockchainActorIO = ActorJack<BlockchainActorInput, BlockchainActorOutput>;

#[async_trait::async_trait]
impl Actor
<
    BlockchainActorInputData,
    BlockchainActorInput,
    BlockchainActorOutput,
    BlockchainActorIO
>
for BlockchainActor
{
    async fn on_input(&mut self, data: BlockchainActorInputData) -> BlockchainActorOutput {
        match data {
            BlockchainActorInputData::SubscribeFinalizedBlocks => {
                BlockchainActorOutput::SubscribeFinalizedBlocks(
                    self.client.subscribe_finalized_blocks().await)
            },
            BlockchainActorInputData::GetBlockHash(number) => {
                BlockchainActorOutput::GetBlockHash(
                    self.client.block_hash(Some(number.into())).await)
            },
            BlockchainActorInputData::GetBlock(hash) => {
                BlockchainActorOutput::GetBlock(
                    self.client.block(Some(hash)).await)
            }
        }
    }
}