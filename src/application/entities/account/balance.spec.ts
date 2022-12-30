import { Balance } from "./balance";

describe("Account balance", () => {
  it("should be able to assign balance", () => {
    const balance = new Balance(100);

    expect(balance).toBeTruthy();
  });

  it("should not be able to assign a balance as string", () => {
    expect(() => new Balance("invalid balance type" as any)).toThrow();
  });
});
