import { User } from "@application/entities/user";
import {
  UsersRepository,
  WhereUniqueData,
} from "@application/repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User) {
    this.users.push(user);
  }

  async existsUnique(uniqueData: WhereUniqueData): Promise<boolean> {
    const foundUser = this.users.find(
      (user) =>
        user.id === uniqueData.id || user.email.value === uniqueData.email
    );

    return !!foundUser;
  }
}
