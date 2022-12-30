import { SignUpUserUseCase } from "@application/use-cases/user/sign-up-user-use-case";
import { PrismaAccountsRepository } from "@infra/database/prisma/repositories/prisma-accounts-repository";
import { PrismaUsersRepository } from "@infra/database/prisma/repositories/prisma-users-repository";
import { Arg, Mutation, Resolver } from "type-graphql";
import { UserViewModel } from "../../view-models/user-view-model";
import {
  SignUpUserResolverRequest,
  SignUpUserResolverResponse,
} from "./sign-up-user-resolver-dtos";

@Resolver()
export class SignUpUserResolver {
  @Mutation(() => SignUpUserResolverResponse)
  async signUp(
    @Arg("request") request: SignUpUserResolverRequest
  ): Promise<SignUpUserResolverResponse> {
    const usersRepository = new PrismaUsersRepository();
    const accountsRepository = new PrismaAccountsRepository();
    const signUpUserUseCase = new SignUpUserUseCase(
      usersRepository,
      accountsRepository
    );

    const { success, errors, user } = await signUpUserUseCase.execute(request);

    return {
      success,
      errors,
      user: user ? UserViewModel.toHTTP(user) : null,
    };
  }
}
