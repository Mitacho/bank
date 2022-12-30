import { BaseResponse } from "@app-types/resolvers/general";
import { User } from "@application/entities/user";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class SignUpUserUseCaseRequest {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}

@ObjectType()
export class SignUpUserUseCaseResponse extends BaseResponse {
  @Field(() => User, { nullable: true })
  user?: User | null;
}
