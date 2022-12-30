import { AccountsRepository } from "@application/repositories/accounts-repository";
import { ListAccountsUseCaseResponse } from "./list-accounts-use-case-dtos";

export class ListAccountsUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(): Promise<ListAccountsUseCaseResponse> {
    const accounts = await this.accountsRepository.list();

    return {
      success: true,
      accounts,
    };
  }
}
