import { BN } from "@coral-xyz/anchor";

export class TokenAmountUtil {
  static toAmount(uiAmount: string, decimals: number = 0): BN {
    if (!decimals) return new BN(uiAmount);
    const [l, r] = uiAmount.split(".");
    return new BN(l.padEnd(l.length + decimals, "0")).add(
      new BN((r || "0").substring(0, decimals).padEnd(decimals, "0"))
    );
  }

  static toUiAmount(amount: BN | string, decimals: number = 0): string {
    const amountString = amount.toString();
    if (!decimals) return amountString;
    return (
      amountString.substring(0, amountString.length - decimals) +
      "." +
      amountString.substring(amountString.length - decimals, amountString.length)
    );
  }
}
