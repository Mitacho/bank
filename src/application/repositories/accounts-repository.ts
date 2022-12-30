import { Account } from "@application/entities/account";

export interface AccountsRepository {
  list(): Promise<Account[]>;
  create(account: Account): Promise<void>;
}
