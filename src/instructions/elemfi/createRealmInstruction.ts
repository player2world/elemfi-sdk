import { Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { ElemFiProgram } from "../../programs";

export type CreateRealmInstructionParams = {
  realmKP: Keypair;
  authority: PublicKey;
  delegator: PublicKey;
  approver: PublicKey;
};

export async function createRealmInstruction(
  program: ElemFiProgram,
  params: CreateRealmInstructionParams
): Promise<TransactionInstruction[]> {
  return [
    await program.account.realm.createInstruction(params.realmKP),
    await program.methods
      .createRealm(params.delegator, params.approver)
      .accounts({
        realm: params.realmKP.publicKey,
        authority: params.authority,
      })
      .instruction(),
  ];
}
