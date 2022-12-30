import { User } from "@app-types/entities/user";
import { BaseResponse } from "@app-types/resolvers/general";
import { IsDefined } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class SignUpUserResolverRequest {
  @IsDefined()
  @Field(() => String)
  email: string;

  @IsDefined()
  @Field(() => String)
  name: string;
}

@ObjectType()
export class SignUpUserResolverResponse extends BaseResponse {
  @Field(() => User, { nullable: true })
  user?: User | null;
}
