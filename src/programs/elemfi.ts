import { Program } from "@coral-xyz/anchor";
import { WalletContext, Provider } from "@elemfi/common";
import { PublicKey } from "@solana/web3.js";
import type { Elemfi } from "../../generated/types/elemfi";
import { IDL } from "../../generated/types/elemfi";
import { Realm, RealmData } from "../accounts/elemfi/Realm";

export const DEFAULT_ELEMFI_PROGRAM_ID = new PublicKey("E1eMFiZrCBjA2KqpTSbysK56aShTgU9TLmh4wXLmv8hS");
export type ElemFiProgram = Program<Elemfi>;

export class ElemFiContext {
  readonly wallet: WalletContext;
  readonly program: ElemFiProgram;

  constructor(readonly provider: Provider, programId: PublicKey = DEFAULT_ELEMFI_PROGRAM_ID) {
    this.wallet = new WalletContext(provider);
    this.program = new Program(IDL, programId, provider);
  }

  async loadRealms(): Promise<Realm[]> {
    const accounts = await this.program.account.realm.all();
    return accounts.map((account) => new Realm(this.provider, account.publicKey, account.account as RealmData));
  }

  async loadRealmsByAuthority(authority: PublicKey): Promise<Realm[]> {
    const accounts = await this.program.account.realm.all([
      {
        memcmp: {
          offset: 8,
          bytes: authority.toBase58(),
        },
      },
    ]);
    return accounts.map((account) => new Realm(this.provider, account.publicKey, account.account as RealmData));
  }
}
