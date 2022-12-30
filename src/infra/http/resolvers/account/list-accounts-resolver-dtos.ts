import { Account } from "@app-types/entities/account";
import { BaseResponse } from "@app-types/resolvers/general";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class ListAccountsResolverRequest {}

@ObjectType()
export class ListAccountsResolverResponse extends BaseResponse {
  @Field(() => [Account], { nullable: true })
  accounts?: Account[] | null;
}
