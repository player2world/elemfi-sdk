import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { ElemFiProgram } from "../../programs";
import { createRealmInstruction } from "../../instructions";
import { ConnectedWallet } from "../../utils";

export interface RealmData {
  authority: PublicKey;
  delegator: PublicKey;
  approver: PublicKey;
  escrowCollection: PublicKey | null;
}

export class Realm {
  private _data?: RealmData;

  get data(): RealmData {
    if (!this._data) throw Error("Realm account not loaded");
    return this._data;
  }

  set data(data: RealmData) {
    this._data = data;
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

  constructor(readonly program: ElemFiProgram, readonly address: PublicKey, data?: RealmData) {
    this._data = data;
  }

  static async create(
    program: ElemFiProgram,
    wallet: ConnectedWallet,
    params: {
      realmKP?: Keypair;
      authorityKP?: Keypair;
      delegator?: PublicKey;
      approver?: PublicKey;
      escrowCollection: PublicKey | null;
    }
  ): Promise<{ tx: VersionedTransaction; realm: Realm }> {
    const realmKP = params.realmKP || Keypair.generate();
    const authority = params.authorityKP?.publicKey || wallet.address;

    const realm = new Realm(program, realmKP.publicKey);
    const instructions = await createRealmInstruction(program, {
      realmKP,
      authority,
      delegator: params.delegator || authority,
      approver: params.approver || authority,
      escrowCollection: params.escrowCollection,
    });
    const tx = await wallet.createLegacyTransaction(instructions);
    if (params.authorityKP) tx.sign([params.authorityKP]);
    tx.sign([realmKP]);
    return { tx, realm };
  }
}
