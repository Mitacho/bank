import { Email } from "./email";

describe("User email", () => {
  it("should be able to create an email", () => {
    const email = new Email("valid@email.com");

    expect(email).toBeTruthy();
  });

  it("should not be able to create an invalid email", () => {
    expect(() => new Email("invalid-email.com")).toThrow();
  });

  it("should not be able to create an empty email", () => {
    expect(() => new Email("")).toThrow();
  });
});
