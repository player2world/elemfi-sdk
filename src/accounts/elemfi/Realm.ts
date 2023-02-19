import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { Provider } from "@elemfi/common";
import { ElemFiContext } from "../../programs";
import { createRealmInstruction, CreateRealmInstructionParams } from "../../instructions";

export interface RealmData {
  authority: PublicKey;
  delegator: PublicKey;
  approver: PublicKey;
  escrowCollection: PublicKey | null;
}

export class Realm extends ElemFiContext {
  private _data?: RealmData;

  get data(): RealmData {
    if (!this._data) throw Error("Realm account not loaded");
    return this._data;
  }

  get authority(): PublicKey {
    return this.data.authority;
  }

  get delegator(): PublicKey {
    return this.data.delegator;
  }

  get approver(): PublicKey {
    return this.data.approver;
  }

  get escrowCollection(): PublicKey | null {
    return this.data.escrowCollection;
  }

  constructor(provider: Provider, readonly address: PublicKey, data?: RealmData) {
    super(provider);
    this._data = data;
  }

  async reloadData() {
    this._data = await this.program.account.realm.fetch(this.address);
  }

  static async load(provider: Provider, address: PublicKey): Promise<Realm> {
    const realm = new Realm(provider, address);
    await realm.reloadData();
    return realm;
  }

  static async create(
    provider: Provider,
    params: {
      realmKP: Keypair;
      authorityKP?: Keypair;
      delegator: PublicKey;
      approver: PublicKey;
      escrowCollection: PublicKey | null;
    }
  ): Promise<{ tx: VersionedTransaction; realm: Realm }> {
    const realm = new Realm(provider, params.realmKP.publicKey);
    const instructions = await createRealmInstruction(realm.program, {
      realmKP: params.realmKP,
      authority: params.authorityKP?.publicKey || realm.wallet.address,
      delegator: params.delegator,
      approver: params.approver,
      escrowCollection: params.escrowCollection,
    });
    const tx = await realm.wallet.createLegacyTransaction(instructions);
    if (params.authorityKP) tx.sign([params.authorityKP]);
    tx.sign([params.realmKP]);
    return { tx, realm };
  }
}
