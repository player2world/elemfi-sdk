import {
  AddressLookupTableAccount,
  Connection,
  PublicKey,
  SignatureResult,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

export class ConnectedWallet {
  constructor(readonly connection: Connection, readonly address: PublicKey) {}

  async createV0Transaction(
    instructions: TransactionInstruction[],
    lutAccounts: AddressLookupTableAccount[] = []
  ): Promise<VersionedTransaction> {
    const message = await this.createTransactionMessage(instructions);
    return new VersionedTransaction(message.compileToV0Message(lutAccounts));
  }

  async createLegacyTransaction(instructions: TransactionInstruction[]): Promise<VersionedTransaction> {
    const message = await this.createTransactionMessage(instructions);
    return new VersionedTransaction(message.compileToLegacyMessage());
  }

  async createTransactionMessage(instructions: TransactionInstruction[]): Promise<TransactionMessage> {
    const { blockhash } = await this.connection.getLatestBlockhash();
    return new TransactionMessage({
      payerKey: this.address,
      recentBlockhash: blockhash,
      instructions,
    });
  }

  async confirmTransaction(signature: string): Promise<SignatureResult> {
    const blockhashWithExpiryBlockHeight = await this.connection.getLatestBlockhash();
    const { value } = await this.connection.confirmTransaction({
      ...blockhashWithExpiryBlockHeight,
      signature,
    });
    return value;
  }
}
