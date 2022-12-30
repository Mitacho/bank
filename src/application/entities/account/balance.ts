export class Balance {
  private readonly balance: number;

  constructor(balance: number) {
    const isValidBalanceType = this.validateBalanceType(balance);

    if (!isValidBalanceType) {
      throw new Error("Balance must be a number");
    }

    this.balance = balance;
  }

  private validateBalanceType(balance: number): boolean {
    return typeof balance === "number";
  }

  get value(): number {
    return this.balance;
  }
}
