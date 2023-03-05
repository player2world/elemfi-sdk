import { BN } from "@coral-xyz/anchor";
import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { ElemFiProgram } from "../../programs";
import { createStrategyInstruction } from "../../instructions";
import { ConnectedWallet, TokenAmountUtil } from "../../utils";
import { Realm } from "./Realm";
import { Vault } from "./Vault";

export interface StrategyData {
  realm: PublicKey;
  vault: PublicKey;
  authority: PublicKey;
  utilizedAmount: BN;
  utilizationMaxAmount: BN;
}

export class Strategy {
  static PREFIX = "elemfi-strategy";

  private _data?: StrategyData;

  get program(): ElemFiProgram {
    return this.vault.program;
  }

  get realm(): Realm {
    return this.vault.realm;
  }

  get data(): StrategyData {
    if (!this._data) throw Error("Strategy account not loaded");
    return this._data;
  }

  set data(data: StrategyData) {
    this._data = data;
  }

  get utilizedAmount(): string {
    return TokenAmountUtil.toUiAmount(this.data.utilizedAmount, this.vault.tokenDecimals);
  }

  get utilizationMaxAmount(): string {
    return TokenAmountUtil.toUiAmount(this.data.utilizationMaxAmount, this.vault.tokenDecimals);
  }

  get address(): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(Strategy.PREFIX), this.vault.address.toBuffer(), this.authority.toBuffer()],
      this.program.programId
    )[0];
  }

  constructor(readonly vault: Vault, readonly authority: PublicKey, data?: StrategyData) {
    this._data = data;
  }

  static async create(
    vault: Vault,
    wallet: ConnectedWallet,
    params: {
      approverKP?: Keypair;
      strategyAuthority: PublicKey;
      utilizedAmount: string;
      utilizationMaxAmount: string;
    }
  ): Promise<{ tx: VersionedTransaction; strategy: Strategy }> {
    const approver = params.approverKP?.publicKey || wallet.address;
    const strategy = new Strategy(vault, params.strategyAuthority);

    const tx = await wallet.createLegacyTransaction([
      await createStrategyInstruction(strategy.program, {
        realm: strategy.realm.address,
        approver,
        vault: vault.address,
        strategy: strategy.address,
        strategyAuthority: strategy.authority,
        payer: vault.program.provider.publicKey || wallet.address,
        utilizedAmount: TokenAmountUtil.toAmount(params.utilizedAmount, vault.tokenDecimals),
        utilizationMaxAmount: TokenAmountUtil.toAmount(params.utilizationMaxAmount, vault.tokenDecimals),
      }),
    ]);
    if (params.approverKP) tx.sign([params.approverKP]);
    return { tx, strategy };
  }
}
