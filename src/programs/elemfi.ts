import { Program, Provider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import type { Elemfi } from "../../generated/types/elemfi";
import { IDL } from "../../generated/types/elemfi";
import { Realm, Vault, Strategy, Obligation } from "../accounts";
import type { RealmData, VaultData, StrategyData, ObligationData } from "../accounts";

export const DEFAULT_ELEMFI_PROGRAM_ID = new PublicKey("E1eMFiZrCBjA2KqpTSbysK56aShTgU9TLmh4wXLmv8hS");
export type ElemFiProgram = Program<Elemfi>;

export class ElemFiSDK {
  readonly program: ElemFiProgram;

  constructor(readonly provider: Provider, programId: PublicKey = DEFAULT_ELEMFI_PROGRAM_ID) {
    this.program = new Program(IDL, programId, provider);
  }

  async loadRealm(address: PublicKey): Promise<Realm> {
    const data = await this.program.account.realm.fetch(address);
    return new Realm(this.program, address, data);
  }

  async loadRealms(): Promise<Realm[]> {
    const accounts = await this.program.account.realm.all();
    return accounts.map((data) => new Realm(this.program, data.publicKey, data.account as RealmData));
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
    return accounts.map((data) => new Realm(this.program, data.publicKey, data.account as RealmData));
  }

  async loadVault(realm: Realm, address: PublicKey): Promise<Vault> {
    const data = await this.program.account.vault.fetch(address);
    return new Vault(realm, address, data);
  }

  async loadVaultsByRealm(realm: Realm): Promise<Vault[]> {
    const accounts = await this.program.account.vault.all([
      {
        memcmp: {
          offset: 8,
          bytes: realm.address.toBase58(),
        },
      },
    ]);
    return accounts.map((data) => new Vault(realm, data.publicKey, data.account as VaultData));
  }

  async loadStrategiesByVault(vault: Vault): Promise<Strategy[]> {
    const accounts = await this.program.account.strategy.all([
      {
        memcmp: {
          offset: 8 + 32,
          bytes: vault.address.toBase58(),
        },
      },
    ]);
    return accounts.map((data) => new Strategy(vault, data.account.authority, data.account as StrategyData));
  }

  async loadObligationsByVault(vault: Vault): Promise<Obligation[]> {
    const accounts = await this.program.account.obligation.all([
      {
        memcmp: {
          offset: 8 + 32,
          bytes: vault.address.toBase58(),
        },
      },
    ]);
    return accounts.map((data) => new Obligation(vault, data.account.createdTs, data.account as ObligationData));
  }
}
