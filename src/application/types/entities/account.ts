import { Field, ObjectType } from "type-graphql";
import { User } from "./user";

@ObjectType()
export class Account {
  @Field(() => String)
  id: string;

  @Field(() => String)
  ownerId: string;

  @Field(() => User, { nullable: true })
  owner?: User | null;

  @Field(() => Number)
  balance: number;

  @Field(() => Date)
  createdAt: Date;
}
