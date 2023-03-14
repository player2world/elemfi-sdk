import { BN } from "@coral-xyz/anchor";
import { AccountMeta, PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { ElemFiProgram } from "../../programs";

type DepositInstructionAccounts = {
  realm: PublicKey;
  vault: PublicKey;
  vaultAuthority: PublicKey;
  collateralToken: PublicKey;
  collateralTokenAccount: PublicKey;
  underlyingTokenOwner: PublicKey;
  tokenProgram: PublicKey;
};

export type DepositInstructionParams = {
  realm: PublicKey;
  vault: PublicKey;
  vaultAuthority: PublicKey;
  underlyingToken: PublicKey;
  collateralToken: PublicKey;
  underlyingTokenOwner: PublicKey;
  amount: BN;
};

function depositInstructionAccounts(params: DepositInstructionParams): {
  [K in keyof DepositInstructionAccounts]: PublicKey;
} {
  return {
    realm: params.realm,
    vault: params.vault,
    vaultAuthority: params.vaultAuthority,
    collateralToken: params.collateralToken,
    collateralTokenAccount: getAssociatedTokenAddressSync(params.collateralToken, params.underlyingTokenOwner, true),
    underlyingTokenOwner: params.underlyingTokenOwner,
    tokenProgram: TOKEN_PROGRAM_ID,
  };
}

function depositRemainingAccounts(params: DepositInstructionParams): AccountMeta[] {
  const remainingAccounts: AccountMeta[] = [];
  if (params.underlyingToken.equals(NATIVE_MINT)) {
    remainingAccounts.push(
      {
        pubkey: params.underlyingTokenOwner,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: params.vaultAuthority,
        isWritable: true,
        isSigner: false,
      },
      {
        pubkey: SystemProgram.programId,
        isWritable: false,
        isSigner: false,
      }
    );
  } else {
    remainingAccounts.push(
      {
        pubkey: getAssociatedTokenAddressSync(params.underlyingToken, params.underlyingTokenOwner, true),
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

export async function depositInstruction(
  program: ElemFiProgram,
  params: DepositInstructionParams
): Promise<TransactionInstruction[]> {
  const accounts = depositInstructionAccounts(params);
  const instructions: TransactionInstruction[] = [];
  const remainingAccounts = depositRemainingAccounts(params);

  try {
    await program.provider.connection.getTokenAccountBalance(accounts.collateralTokenAccount);
  } catch {
    instructions.push(
      createAssociatedTokenAccountInstruction(
        params.underlyingTokenOwner,
        accounts.collateralTokenAccount,
        params.underlyingTokenOwner,
        params.collateralToken
      )
    );
  }

  instructions.push(
    await program.methods.deposit(params.amount).accounts(accounts).remainingAccounts(remainingAccounts).instruction()
  );

  return instructions;
}
