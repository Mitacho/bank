import { Replace } from "@helpers/object";
import { randomUUID } from "crypto";
import { Email } from "./email";

export interface UserProps {
  name: string;
  email: Email;
  createdAt: Date;
}

export class User implements UserProps {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): Email {
    return this.props.email;
  }

  public set email(email: Email) {
    this.props.email = email;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
