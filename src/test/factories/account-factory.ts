import { Account, AccountProps } from "@application/entities/account";
import { Balance } from "@application/entities/account/balance";
import { Email, User } from "@application/entities/user";
import { randomUUID } from "crypto";

type Override = Partial<AccountProps>;

export function makeAccount(override: Override = {}) {
  return new Account({
    ownerId: randomUUID(),
    owner: new User({
      email: new Email("john@doe.com"),
      name: "John Doe",
    }),
    balance: new Balance(100),
    ...override,
  });
}
