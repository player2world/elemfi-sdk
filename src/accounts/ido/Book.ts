import { BN } from "@coral-xyz/anchor";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, SystemProgram, TransactionInstruction, VersionedTransaction } from "@solana/web3.js";
import { IdoProgram } from "../../programs";
import { Pool } from "./Pool";
import { ConnectedWallet, TokenAmountUtil } from "../../utils";

export interface BookData {
  pool: PublicKey;
  user: PublicKey;
  totalAmount: BN;
  claimedAmount: BN;
}

export class Book {
  static PREFIX = "book";

  private _data?: BookData | null;

  get program(): IdoProgram {
    return this.pool.program;
  }

  get data(): BookData | null {
    return this._data || null;
  }

  set data(data: BookData | null) {
    this._data = data;
  }

  get address(): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(Book.PREFIX), this.pool.address.toBuffer(), this.user.toBuffer()],
      this.program.programId
    )[0];
  }

  get totalAmount(): string {
    if (!this.data) return "0";
    return TokenAmountUtil.toUiAmount(this.data.totalAmount, this.pool.data.decimals);
  }

  get claimedAmount(): string {
    if (!this.data) return "0";
    return TokenAmountUtil.toUiAmount(this.data.claimedAmount, this.pool.data.decimals);
  }

  get claimableAmount(): string {
    if (!this.data) return "0";

    const currentTs = Math.trunc(new Date().getTime() / 1000);
    if (currentTs < this.pool.data.startTs) return "0";

    if (currentTs < this.pool.data.endTs) {
      const vestingN = Math.floor((this.pool.data.endTs - this.pool.data.startTs) / this.pool.data.duration);
      const vestedN = Math.floor((currentTs - this.pool.data.startTs) / this.pool.data.duration);
      return TokenAmountUtil.toUiAmount(
        this.data.totalAmount.muln(vestedN).divn(vestingN).sub(this.data.claimedAmount),
        this.pool.data.decimals
      );
    } else {
      return TokenAmountUtil.toUiAmount(this.data.totalAmount.sub(this.data.claimedAmount), this.pool.data.decimals);
    }
  }

  constructor(readonly pool: Pool, readonly user: PublicKey, data?: BookData) {
    this._data = data;
  }

  async claim(
    wallet: ConnectedWallet,
    params: {
      totalAmount: number;
      merkleIndex: number;
      merkleProof: string[];
    }
  ): Promise<VersionedTransaction> {
    const instructions: TransactionInstruction[] = [];

    if (!this.data) {
      instructions.push(
        await this.program.methods
          .createBook(
            TokenAmountUtil.toAmount(params.totalAmount.toString(), this.pool.data.decimals),
            params.merkleIndex,
            params.merkleProof.map((hexStr) => [...Buffer.from(hexStr, "hex")])
          )
          .accounts({
            user: wallet.address,
            pool: this.pool.address,
            book: this.address,
            rentPayer: wallet.address, // blindly set
            systemProgram: SystemProgram.programId,
          })
          .instruction()
      );
    }

    const userTokenAccount = getAssociatedTokenAddressSync(this.pool.treasuryMint, this.user, true);
    instructions.push(
      await this.program.methods
        .claim()
        .accounts({
          user: wallet.address,
          pool: this.pool.address,
          book: this.address,
          poolTokenAccount: getAssociatedTokenAddressSync(this.pool.treasuryMint, this.pool.address, true),
          userTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .instruction()
    );

    try {
      await this.program.provider.connection.getTokenAccountBalance(userTokenAccount);
    } catch {
      instructions.push(
        createAssociatedTokenAccountInstruction(
          wallet.address, // blindly set
          userTokenAccount,
          wallet.address,
          this.pool.treasuryMint
        )
      );
    }

    return wallet.createLegacyTransaction(instructions);
  }
}
