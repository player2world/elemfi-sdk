import { BN } from "@coral-xyz/anchor";
import { Keypair, PublicKey, SystemProgram, VersionedTransaction } from "@solana/web3.js";
import {
  AuthorityType,
  MintLayout,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createMintToCheckedInstruction,
  createSetAuthorityInstruction,
} from "@solana/spl-token";
import { ElemFiProgram } from "../../programs";
import { createVaultInstruction } from "../../instructions";
import { ConnectedWallet, TokenAmountUtil } from "../../utils";
import { Realm } from "./Realm";

export interface VaultData {
  realm: PublicKey;
  authorityBump: number;
  tokenDecimals: number;
  collateralToken: PublicKey;
  collateralSupply: BN;
  collateralMaxSupply: BN;
  collateralMinAmount: BN;
  collateralMaxAmount: BN;
  underlyingToken: PublicKey;
  underlyingLiquidity: BN;
  pendingObligationAmount: BN;
  pendingObligations: number;
  escrowCollection: PublicKey | null;
}

export class Vault {
  static AUTHORITY_PREFIX = "elemfi-vault-authority";
  private _data?: VaultData;

  get program(): ElemFiProgram {
    return this.realm.program;
  }

  get data(): VaultData {
    if (!this._data) throw Error("Vault account not loaded");
    return this._data;
  }

  set data(data: VaultData) {
    this._data = data;
  }

  get tokenDecimals(): number {
    return this.data.tokenDecimals;
  }

  get collateralToken(): PublicKey {
    return this.data.collateralToken;
  }

  get collateralSupply(): string {
    return TokenAmountUtil.toUiAmount(this.data.collateralSupply, this.data.tokenDecimals);
  }

  get collateralMaxSupply(): string {
    return TokenAmountUtil.toUiAmount(this.data.collateralMaxSupply, this.data.tokenDecimals);
  }

  get collateralMinAmount(): string {
    return TokenAmountUtil.toUiAmount(this.data.collateralMinAmount, this.data.tokenDecimals);
  }

  get collateralMaxAmount(): string {
    return TokenAmountUtil.toUiAmount(this.data.collateralMaxAmount, this.data.tokenDecimals);
  }

  get underlyingToken(): PublicKey {
    return this.data.underlyingToken;
  }

  get underlyingLiquidity(): string {
    return TokenAmountUtil.toUiAmount(this.data.underlyingLiquidity, this.data.tokenDecimals);
  }

  get pendingObligationAmount(): string {
    return TokenAmountUtil.toUiAmount(this.data.pendingObligationAmount, this.data.tokenDecimals);
  }

  get pendingObligations(): number {
    return this.data.pendingObligations;
  }

  get escrowCollection(): PublicKey | null {
    return this.data.escrowCollection;
  }

  get authority(): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from(Vault.AUTHORITY_PREFIX), this.address.toBuffer()],
      this.program.programId
    )[0];
  }

  constructor(readonly realm: Realm, readonly address: PublicKey, data?: VaultData) {
    this._data = data;
  }

  static async create(
    realm: Realm,
    wallet: ConnectedWallet,
    params: {
      vaultKP?: Keypair;
      authorityKP?: Keypair;
      collateralTokenKP?: Keypair;
      collateralSupply?: string;
      collateralMaxSupply: string;
      collateralMinAmount: string;
      collateralMaxAmount: string;
      underlyingToken: PublicKey;
      underlyingLiquidity: string;
      escrowCollection: PublicKey | null;
    }
  ): Promise<{ tx: VersionedTransaction; vault: Vault }> {
    const vaultKP = params.vaultKP || Keypair.generate();
    const collateralTokenKP = params.collateralTokenKP || Keypair.generate();
    const collateralToken = collateralTokenKP.publicKey;
    const authority = params.authorityKP?.publicKey || wallet.address;

    const vault = new Vault(realm, vaultKP.publicKey);
    const { value: underlyingSupply } = await vault.program.provider.connection.getTokenSupply(params.underlyingToken);

    const instructions = [
      SystemProgram.createAccount({
        fromPubkey: wallet.address,
        newAccountPubkey: collateralToken,
        space: MintLayout.span,
        lamports: await getMinimumBalanceForRentExemptMint(vault.program.provider.connection),
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(collateralToken, underlyingSupply.decimals, authority, null),
    ];

    if (params.collateralSupply !== undefined) {
      const destination = getAssociatedTokenAddressSync(collateralToken, authority, true);
      const collateralSupply = TokenAmountUtil.toAmount(params.collateralSupply, underlyingSupply.decimals);
      instructions.push(
        createAssociatedTokenAccountInstruction(wallet.address, destination, authority, collateralToken),
        createMintToCheckedInstruction(
          collateralToken,
          destination,
          authority,
          BigInt(collateralSupply.toString()),
          underlyingSupply.decimals
        )
      );
    }

    instructions.push(
      createSetAuthorityInstruction(collateralToken, authority, AuthorityType.MintTokens, vault.authority),
      ...(await createVaultInstruction(vault.program, {
        realm: realm.address,
        authority,
        vaultKP,
        vaultAuthority: vault.authority,
        collateralToken,
        collateralMaxSupply: TokenAmountUtil.toAmount(params.collateralMaxSupply, underlyingSupply.decimals),
        collateralMinAmount: TokenAmountUtil.toAmount(params.collateralMinAmount, underlyingSupply.decimals),
        collateralMaxAmount: TokenAmountUtil.toAmount(params.collateralMaxAmount, underlyingSupply.decimals),
        underlyingToken: params.underlyingToken,
        underlyingLiquidity: TokenAmountUtil.toAmount(params.underlyingLiquidity, underlyingSupply.decimals),
        escrowCollection: params.escrowCollection,
      }))
    );
    const tx = await wallet.createLegacyTransaction(instructions);
    if (params.authorityKP) tx.sign([params.authorityKP]);
    tx.sign([vaultKP, collateralTokenKP]);
    return { tx, vault };
  }
}
