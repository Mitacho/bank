import { Account } from "@application/entities/account";
import { AccountsRepository } from "@application/repositories/accounts-repository";

export class InMemoryAccountsRepository implements AccountsRepository {
  public accounts: Account[] = [];

  async list() {
    return this.accounts;
  }

  async create(account: Account): Promise<void> {
    this.accounts.push(account);
  }
}
