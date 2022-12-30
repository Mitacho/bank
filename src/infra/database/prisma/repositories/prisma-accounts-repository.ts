import { Account } from "@application/entities/account";
import { AccountsRepository } from "@application/repositories/accounts-repository";
import { Account as RawAccount, Prisma } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";
import { parseSelectedFields } from "prisma-parse-selected-fields/dist/handlers";
import { prisma } from "../client";
import { PrismaAccountMapper } from "../mappers/prisma-account-mapper";

export class PrismaAccountsRepository implements AccountsRepository {
  select: Prisma.AccountSelect | null;

  constructor(private info?: GraphQLResolveInfo) {
    this.select = info
      ? parseSelectedFields(this.info as any)?.accounts?.select
      : null;
  }

  async create(account: Account): Promise<void> {
    const raw = PrismaAccountMapper.toPrisma(account);

    await prisma.account.create({
      data: raw,
    });
  }

  async list(): Promise<Account[]> {
    const accounts = (await prisma.account.findMany({
      select: this.select,
    })) as RawAccount[];

    return accounts.map(PrismaAccountMapper.toDomain);
  }
}
