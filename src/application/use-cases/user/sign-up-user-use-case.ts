import { Account } from "@application/entities/account";
import { Balance } from "@application/entities/account/balance";
import { AccountsRepository } from "@application/repositories/accounts-repository";
import { UsersRepository } from "@application/repositories/users-repository";
import { Email, User } from "@entities/user";
import { parseFieldErrorFromCatch } from "@helpers/error";
import {
  SignUpUserUseCaseRequest,
  SignUpUserUseCaseResponse,
} from "./sign-up-user-use-case-dtos";

export class SignUpUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private accountsRepository: AccountsRepository
  ) {}

  async execute(
    request: SignUpUserUseCaseRequest
  ): Promise<SignUpUserUseCaseResponse> {
    const { email, name } = request;

    // check if email is in use
    const emailAlreadyInUse = await this.usersRepository.existsUnique({
      email,
    });

    if (emailAlreadyInUse) {
      return {
        success: false,
        errors: [
          {
            field: "email",
            message: "Email already in use",
          },
        ],
      };
    }

    // create user
    let user: User | null;

    try {
      user = new User({
        name,
        email: new Email(email),
      });
    } catch (error) {
      return {
        success: false,
        errors: parseFieldErrorFromCatch(error),
      };
    }

    try {
      await this.usersRepository.create(user);
    } catch (error: any) {
      return {
        success: false,
        errors: [
          {
            field: "db",
            message: error.message,
          },
        ],
      };
    }

    // create user account
    let account: Account | null;

    try {
      account = new Account({
        balance: new Balance(0),
        ownerId: user.id,
      });
    } catch (error) {
      return {
        success: false,
        errors: parseFieldErrorFromCatch(error),
      };
    }

    try {
      await this.accountsRepository.create(account);
    } catch (error) {
      return {
        success: false,
        errors: parseFieldErrorFromCatch(error),
      };
    }

    return {
      success: true,
      user,
    };
  }
}
