import { PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { ElemFiProgram } from "../../programs";

export type CreateStrategyInstructionParams = {
  realm: PublicKey;
  approver: PublicKey;
  vault: PublicKey;
  strategy: PublicKey;
  strategyAuthority: PublicKey;
  payer: PublicKey;
  utilizedAmount: BN;
  utilizationMaxAmount: BN;
};

export function createStrategyInstruction(
  program: ElemFiProgram,
  params: CreateStrategyInstructionParams
): Promise<TransactionInstruction> {
  return program.methods
    .createStrategy(params.strategyAuthority, params.utilizedAmount, params.utilizationMaxAmount)
    .accounts({
      realm: params.realm,
      approver: params.approver,
      vault: params.vault,
      strategy: params.strategy,
      payer: params.payer,
      systemProgram: SystemProgram.programId,
    })
    .instruction();
}
