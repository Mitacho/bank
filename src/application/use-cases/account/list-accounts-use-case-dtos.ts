import { BaseResponse } from "@app-types/resolvers/general";
import { Account } from "@application/entities/account";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class ListAccountsUseCaseRequest {}

@ObjectType()
export class ListAccountsUseCaseResponse extends BaseResponse {
  @Field(() => [Account], { nullable: true })
  accounts?: Account[] | null;
}
