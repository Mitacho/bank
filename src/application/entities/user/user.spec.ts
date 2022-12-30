import { Email } from "./email";
import { User } from "./user";

describe("User", () => {
  it("Should be able to create an user account", () => {
    const user = new User({
      name: "John Doe",
      email: new Email("john-doe@gmail.com"),
    });

    expect(user).toBeTruthy();
  });
});
