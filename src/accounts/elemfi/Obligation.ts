import { BN } from "@coral-xyz/anchor";
import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { ElemFiProgram } from "../../programs";
import { closeObligationInstruction, createObligationInstruction } from "../../instructions";
import { ConnectedWallet, TokenAmountUtil } from "../../utils";
import { Realm } from "./Realm";
import { Vault } from "./Vault";

export interface ObligationData {
  realm: PublicKey;
  vault: PublicKey;
  rentCollector: PublicKey;
  destination: PublicKey;
  burntAmount: BN;
  pendingAmount: BN;
  createdTs: number;
}

export class Obligation {
  static PREFIX = "elemfi-obligation";

  private _data?: ObligationData;

  get program(): ElemFiProgram {
    return this.vault.program;
  }

  get realm(): Realm {
    return this.vault.realm;
  }

  get data(): ObligationData {
    if (!this._data) throw Error("Obligation account not loaded");
    return this._data;
  }

  set data(data: ObligationData) {
    this._data = data;
  }

  get burntAmount(): string {
    return TokenAmountUtil.toUiAmount(this.data.burntAmount, this.vault.tokenDecimals);
  }

  get pendingAmount(): string {
    return TokenAmountUtil.toUiAmount(this.data.pendingAmount, this.vault.tokenDecimals);
  }

  get createdAt(): Date {
    return new Date(this.data.createdTs * 1000);
  }

  get address(): PublicKey {
    return PublicKey.findProgramAddressSync(
      [
        Buffer.from(Obligation.PREFIX),
        this.vault.address.toBuffer(),
        new BN(this.createdTs.toString()).toArrayLike(Buffer, "le", 4),
      ],
      this.program.programId
    )[0];
  }

  constructor(
    readonly vault: Vault,
    readonly createdTs: number = Math.trunc(new Date().getTime() / 1000) - 60,
    data?: ObligationData
  ) {
    this._data = data;
  }

  static async create(
    vault: Vault,
    wallet: ConnectedWallet,
    params: {
      amount: string;
    }
  ): Promise<{ tx: VersionedTransaction; obligation: Obligation }> {
    const obligation = new Obligation(vault);

    const tx = await wallet.createLegacyTransaction(
      await createObligationInstruction(obligation.program, {
        realm: obligation.realm.address,
        vault: vault.address,
        vaultAuthority: vault.authority,
        obligation: obligation.address,
        underlyingToken: obligation.vault.underlyingToken,
        collateralToken: obligation.vault.collateralToken,
        collateralTokenAccount: getAssociatedTokenAddressSync(obligation.vault.collateralToken, wallet.address, true),
        collateralTokenOwner: wallet.address,
        payer: vault.program.provider.publicKey || wallet.address,
        amount: TokenAmountUtil.toAmount(params.amount, vault.tokenDecimals),
        createdTs: obligation.createdTs,
      })
    );
    return { tx, obligation };
  }

  async close(wallet: ConnectedWallet, params?: Partial<{ authorityKP: Keypair }>): Promise<VersionedTransaction> {
    const tx = await wallet.createLegacyTransaction(
      await closeObligationInstruction(this.program, {
        realm: this.realm.address,
        authority: params?.authorityKP?.publicKey || wallet.address,
        vault: this.vault.address,
        vaultAuthority: this.vault.authority,
        underlyingToken: this.vault.underlyingToken,
        obligation: this.address,
        destination: this.data.destination,
        rentCollector: this.data.rentCollector,
      })
    );
    if (params?.authorityKP) tx.sign([params.authorityKP]);
    return tx;
  }
}
