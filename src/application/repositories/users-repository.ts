import { User } from "@entities/user";

export interface WhereUniqueData {
  id?: string;
  email?: string;
}

export interface UsersRepository {
  create(user: User): Promise<void>;
  existsUnique(uniqueData: WhereUniqueData): Promise<boolean>;
}
