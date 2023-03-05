import { BN } from "@coral-xyz/anchor";
import { AccountMeta, PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { ElemFiProgram } from "../../programs";

type CreateObligationInstructionAccounts = {
  realm: PublicKey;
  vault: PublicKey;
  vaultAuthority: PublicKey;
  obligation: PublicKey;
  collateralToken: PublicKey;
  collateralTokenAccount: PublicKey;
  collateralTokenOwner: PublicKey;
  tokenProgram: PublicKey;
  payer: PublicKey;
  systemProgram: PublicKey;
};

export type CreateObligationInstructionParams = {
  realm: PublicKey;
  vault: PublicKey;
  vaultAuthority: PublicKey;
  obligation: PublicKey;
  underlyingToken: PublicKey;
  collateralToken: PublicKey;
  collateralTokenAccount: PublicKey;
  collateralTokenOwner: PublicKey;
  payer: PublicKey;
  amount: BN;
  createdTs: number;
};

function createObligationInstructionAccounts(params: CreateObligationInstructionParams): {
  [K in keyof CreateObligationInstructionAccounts]: PublicKey;
} {
  return {
    realm: params.realm,
    vault: params.vault,
    vaultAuthority: params.vaultAuthority,
    obligation: params.vaultAuthority,
    collateralToken: params.collateralToken,
    collateralTokenAccount: params.collateralTokenAccount,
    collateralTokenOwner: params.collateralTokenOwner,
    tokenProgram: TOKEN_PROGRAM_ID,
    payer: params.payer,
    systemProgram: SystemProgram.programId,
  };
}

function createObligationRemainingAccounts(params: CreateObligationInstructionParams): AccountMeta[] {
  const remainingAccounts: AccountMeta[] = [];
  if (params.underlyingToken.equals(NATIVE_MINT)) {
    remainingAccounts.push(
      {
        pubkey: params.collateralTokenOwner,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: params.vaultAuthority,
        isWritable: true,
        isSigner: false,
      }
    );
  } else {
    remainingAccounts.push(
      {
        pubkey: getAssociatedTokenAddressSync(params.underlyingToken, params.collateralTokenOwner, true),
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: getAssociatedTokenAddressSync(params.underlyingToken, params.vaultAuthority, true),
        isWritable: true,
        isSigner: false,
      }
    );
  }
  return remainingAccounts;
}

export async function createObligationInstruction(
  program: ElemFiProgram,
  params: CreateObligationInstructionParams
): Promise<TransactionInstruction[]> {
  const instructions: TransactionInstruction[] = [];
  const remainingAccounts = createObligationRemainingAccounts(params);

  if (!params.underlyingToken.equals(NATIVE_MINT)) {
    try {
      await program.provider.connection.getTokenAccountBalance(remainingAccounts[0].pubkey);
    } catch {
      instructions.push(
        createAssociatedTokenAccountInstruction(
          params.payer,
          remainingAccounts[0].pubkey,
          params.collateralTokenOwner,
          params.underlyingToken
        )
      );
    }
  }

  instructions.push(
    await program.methods
      .createObligation(params.amount, params.createdTs)
      .accounts(createObligationInstructionAccounts(params))
      .remainingAccounts(remainingAccounts)
      .instruction()
  );

  return instructions;
}
