import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { IdoProgram } from "../../programs";
import { TokenAmountUtil } from "../../utils";

export interface PoolData {
  admin: PublicKey;
  treasuryMint: PublicKey;
  decimals: number;
  bump: number;
  claimedAmount: BN;
  startTs: number;
  endTs: number;
  duration: number;
  merkleRoot: number[];
}

export class Pool {
  static PREFIX = "pool";

  private _data?: PoolData;

  get data(): PoolData {
    if (!this._data) throw Error("Pool account not loaded");
    return this._data;
  }

  set data(data: PoolData) {
    this._data = data;
  }

  get address(): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(Pool.PREFIX), this.treasuryMint.toBuffer()],
      this.program.programId
    )[0];
  }

  get claimedAmount(): string {
    return TokenAmountUtil.toUiAmount(this.data.claimedAmount, this.data.decimals);
  }

  get startDate(): Date {
    return new Date(this.data.startTs * 1000);
  }

  get endDate(): Date {
    return new Date(this.data.endTs * 1000);
  }

  constructor(readonly program: IdoProgram, readonly treasuryMint: PublicKey, data?: PoolData) {
    this._data = data;
  }
}
