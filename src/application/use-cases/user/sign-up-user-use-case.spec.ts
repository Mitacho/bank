import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts-repository";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-user-repository";
import { SignUpUserUseCase } from "./sign-up-user-use-case";

describe("Sign up user", () => {
  it("should be able to sign up an user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const accountsRepository = new InMemoryAccountsRepository();
    const signUpUserUseCase = new SignUpUserUseCase(
      usersRepository,
      accountsRepository
    );

    const { user } = await signUpUserUseCase.execute({
      email: "valid@email.com",
      name: "John Doe",
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });
});
