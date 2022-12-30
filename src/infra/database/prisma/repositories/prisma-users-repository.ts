import { User } from "@application/entities/user";
import {
  UsersRepository,
  WhereUniqueData,
} from "@application/repositories/users-repository";
import { prisma } from "../client";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

export class PrismaUsersRepository implements UsersRepository {
  async existsUnique(uniqueData: WhereUniqueData): Promise<boolean> {
    const exists = await prisma.user.findUnique({
      where: uniqueData,
    });

    return !!exists;
  }

  async create(user: User) {
    const raw = PrismaUserMapper.toPrisma(user);

    await prisma.user.create({
      data: raw,
    });
  }
}
