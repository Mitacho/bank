import { Account } from "@application/entities/account";
import { Balance } from "@application/entities/account/balance";
import { Email, User } from "@application/entities/user";
import { Account as RawAccount, User as RawUser } from "@prisma/client";

export class PrismaAccountMapper {
  static toPrisma(account: Account) {
    return {
      id: account.id,
      balance: account.balance.value,
      ownerId: account.ownerId,
      createdAt: account.createdAt,
    };
  }

  static toDomain(raw: RawAccount & { owner?: RawUser | null }) {
    return new Account(
      {
        ownerId: raw.ownerId,
        owner: raw.owner
          ? new User(
              {
                email: new Email(raw.owner.email),
                name: raw.owner.name,
                createdAt: raw.owner.createdAt,
              },
              raw.owner.id
            )
          : null,
        balance: new Balance(raw.balance),
        createdAt: raw.createdAt,
      },
      raw.id
    );
  }
}
