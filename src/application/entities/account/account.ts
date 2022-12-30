import { Replace } from "@helpers/object";
import { randomUUID } from "crypto";
import { User } from "../user";
import { Balance } from "./balance";

export interface AccountProps {
  ownerId: string;
  owner?: User | null;
  balance: Balance;
  createdAt: Date;
}

export class Account implements AccountProps {
  private _id: string;
  private props: AccountProps;

  constructor(props: Replace<AccountProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get ownerId(): string {
    return this.props.ownerId;
  }

  public set ownerId(ownerId: string) {
    this.props.ownerId = ownerId;
  }

  public get owner(): User | undefined | null {
    return this.props.owner;
  }

  public set owner(owner: User | undefined | null) {
    this.props.owner = owner;
  }

  public get balance(): Balance {
    return this.props.balance;
  }

  public set balance(balance: Balance) {
    this.props.balance = balance;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
