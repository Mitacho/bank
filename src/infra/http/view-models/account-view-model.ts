import { Account } from "@application/entities/account";
import { UserViewModel } from "./user-view-model";

export class AccountViewModel {
  static toHTTP(account: Account) {
    return {
      id: account.id,
      balance: account.balance.value,
      ownerId: account.ownerId,
      owner: UserViewModel.toHTTP(account.owner),
      createdAt: account.createdAt,
    };
  }
}
