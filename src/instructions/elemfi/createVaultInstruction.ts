import { BN } from "@coral-xyz/anchor";
import { Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddressSync, NATIVE_MINT } from "@solana/spl-token";
import { ElemFiProgram } from "../../programs";

export type CreateVaultInstructionParams = {
  realm: PublicKey;
  authority: PublicKey;
  vaultKP: Keypair;
  vaultAuthority: PublicKey;
  collateralToken: PublicKey;
  collateralMaxSupply: BN;
  collateralMinAmount: BN;
  collateralMaxAmount: BN;
  underlyingToken: PublicKey;
  underlyingLiquidity: BN;
  escrowCollection: PublicKey | null;
};

export async function createVaultInstruction(
  program: ElemFiProgram,
  params: CreateVaultInstructionParams
): Promise<TransactionInstruction[]> {
  const instructions = [
    await program.account.vault.createInstruction(params.vaultKP),
    await program.methods
      .createVault(
        params.collateralMaxSupply,
        params.collateralMinAmount,
        params.collateralMaxAmount,
        params.underlyingLiquidity,
        params.escrowCollection
      )
      .accounts({
        realm: params.realm,
        authority: params.authority,
        vault: params.vaultKP.publicKey,
        vaultAuthority: params.vaultAuthority,
        collateralToken: params.collateralToken,
      })
      .remainingAccounts([
        {
          pubkey: params.underlyingToken,
          isSigner: false,
          isWritable: false,
        },
      ])
      .instruction(),
  ];

  if (!params.underlyingToken.equals(NATIVE_MINT)) {
    const vaultTokenAddress = getAssociatedTokenAddressSync(params.underlyingToken, params.vaultAuthority, true);
    try {
      await program.provider.connection.getTokenAccountBalance(vaultTokenAddress);
    } catch {
      instructions.push(
        createAssociatedTokenAccountInstruction(
          program.provider.publicKey!,
          vaultTokenAddress,
          params.vaultAuthority,
          params.underlyingToken
        )
      );
    }
  }

  return instructions;
}
