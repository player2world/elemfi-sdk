import { AccountMeta, PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { ElemFiProgram } from "../../programs";

export type CloseObligationInstructionParams = {
  realm: PublicKey;
  authority: PublicKey;
  vault: PublicKey;
  vaultAuthority: PublicKey;
  underlyingToken: PublicKey;
  obligation: PublicKey;
  destination: PublicKey;
  rentCollector: PublicKey;
};

export async function closeObligationInstruction(
  program: ElemFiProgram,
  params: CloseObligationInstructionParams
): Promise<TransactionInstruction[]> {
  const instructions: TransactionInstruction[] = [];
  const remainingAccounts: AccountMeta[] = [];

  if (params.underlyingToken.equals(NATIVE_MINT)) {
    remainingAccounts.push({
      pubkey: params.vaultAuthority,
      isWritable: true,
      isSigner: false,
    });
  } else {
    remainingAccounts.push(
      {
        pubkey: getAssociatedTokenAddressSync(params.underlyingToken, params.vaultAuthority, true),
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: TOKEN_PROGRAM_ID,
        isWritable: false,
        isSigner: false,
      }
    );
  }

  instructions.push(
    await program.methods
      .closeObligation()
      .accounts({
        realm: params.realm,
        authority: params.authority,
        vault: params.vault,
        vaultAuthority: params.vaultAuthority,
        obligation: params.obligation,
        destination: params.destination,
        rentCollector: params.rentCollector,
        systemProgram: SystemProgram.programId,
      })
      .remainingAccounts(remainingAccounts)
      .instruction()
  );

  return instructions;
}
