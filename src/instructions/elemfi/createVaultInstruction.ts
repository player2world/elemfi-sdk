import { Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { ElemFiProgram } from "../../programs";

export type CreateVaultInstructionParams = {
  realm: PublicKey;
  authority: PublicKey;
  vaultKP: Keypair;
  vaultAuthority: PublicKey;
  collateralToken: PublicKey;
  underlyingToken: PublicKey;
  collateralMaxSupply: BN;
  underlyingLiquidity: BN;
};

export async function createVaultInstruction(
  program: ElemFiProgram,
  params: CreateVaultInstructionParams
): Promise<TransactionInstruction[]> {
  return [
    await program.account.vault.createInstruction(params.vaultKP),
    await program.methods
      .createVault(params.collateralMaxSupply, params.underlyingLiquidity)
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
}
