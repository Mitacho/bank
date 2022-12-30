import { NonEmptyArray } from "type-graphql";
import { ListAccountsResolver } from "./account";
import { SignUpUserResolver } from "./user";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  SignUpUserResolver,
  ListAccountsResolver,
];
