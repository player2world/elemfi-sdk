import { Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { ElemFiProgram } from "../../programs";

export type CreateRealmInstructionParams = {
  realmKP: Keypair;
  authority: PublicKey;
  delegator: PublicKey;
  approver: PublicKey;
  escrowCollection: PublicKey | null;
};

export async function createRealmInstruction(
  program: ElemFiProgram,
  params: CreateRealmInstructionParams
): Promise<TransactionInstruction[]> {
  return [
    await program.account.realm.createInstruction(params.realmKP),
    await program.methods
      .createRealm(params.delegator, params.approver, params.escrowCollection)
      .accounts({
        realm: params.realmKP.publicKey,
        authority: params.authority,
      })
      .instruction(),
  ];
}
