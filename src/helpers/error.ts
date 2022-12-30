import { FieldError as FieldErrorObjectType } from "@app-types/resolvers/general";

export class FieldError extends Error {
  readonly field: string;

  constructor(message: string, field: string) {
    super(message);
    this.field = field;
  }
}

interface FieldErrorType extends Error {
  field: string;
}

export function parseErrorFromCatch(
  error: any | unknown
): FieldErrorObjectType[] {
  const { field, message } = error as FieldErrorType;

  return [
    {
      field,
      message,
    },
  ];
}
