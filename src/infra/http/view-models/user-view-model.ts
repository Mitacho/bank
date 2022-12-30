import { User } from "@application/entities/user";

export class UserViewModel {
  static toHTTP(user?: User | null) {
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email.value,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
