import { FieldError } from "@helpers/error";
import * as EmailValidator from "email-validator";

const FIELD = "email";

export class Email {
  private readonly email: string;

  constructor(email: string) {
    if (!email) {
      throw new FieldError("Empty email", FIELD);
    }

    const isValidEmail = this.validateEmail(email);

    if (!isValidEmail) {
      throw new FieldError("Invalid email", FIELD);
    }

    this.email = email;
  }

  private validateEmail(email: string): boolean {
    return EmailValidator.validate(email);
  }

  get value(): string {
    return this.email;
  }
}
