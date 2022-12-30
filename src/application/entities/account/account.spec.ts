import { randomUUID } from "crypto";
import { Account } from "./account";
import { Balance } from "./balance";

describe("Account", () => {
  it("Should be able to create an account", () => {
    const account = new Account({
      ownerId: randomUUID(),
      balance: new Balance(0),
    });

    expect(account).toBeTruthy();
  });
});
