import { Email, User } from "@application/entities/user";
import { makeAccount } from "@test/factories/account-factory";
import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts-repository";
import { randomUUID } from "crypto";
import { ListAccountsUseCase } from "./list-accounts-use-case";

describe("List accounts", () => {
  it("should be able to get a list of accounts", async () => {
    const accountsRepository = new InMemoryAccountsRepository();
    const listAccountsUseCase = new ListAccountsUseCase(accountsRepository);

    const firstOwnerId = randomUUID();
    const secondOwnerId = randomUUID();

    await accountsRepository.create(
      makeAccount({
        ownerId: firstOwnerId,
        owner: new User({
          email: new Email("john@doe.com"),
          name: "John Doe",
        }),
      })
    );

    await accountsRepository.create(
      makeAccount({
        ownerId: secondOwnerId,
        owner: new User({
          email: new Email("tony@stark.com"),
          name: "Tony Stark",
        }),
      })
    );

    const { accounts } = await listAccountsUseCase.execute();

    expect(accounts).toHaveLength(2);
    expect(accounts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ownerId: firstOwnerId,
        }),
        expect.objectContaining({
          ownerId: secondOwnerId,
        }),
      ])
    );
  });
});
