import { ListAccountsUseCase } from "@application/use-cases/account/list-accounts-use-case";
import { PrismaAccountsRepository } from "@infra/database/prisma/repositories/prisma-accounts-repository";
import { GraphQLResolveInfo } from "graphql";
import { Info, Query, Resolver } from "type-graphql";
import { AccountViewModel } from "../../view-models/account-view-model";
import { ListAccountsResolverResponse } from "./list-accounts-resolver-dtos";

@Resolver()
export class ListAccountsResolver {
  @Query(() => ListAccountsResolverResponse)
  async list(
    @Info() info: GraphQLResolveInfo
  ): Promise<ListAccountsResolverResponse> {
    const accountsRepository = new PrismaAccountsRepository(info);
    const listAccountsUseCase = new ListAccountsUseCase(accountsRepository);

    const { success, errors, accounts } = await listAccountsUseCase.execute();

    return {
      success,
      errors,
      accounts: accounts?.length ? accounts.map(AccountViewModel.toHTTP) : [],
    };
  }
}
