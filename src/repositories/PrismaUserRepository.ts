import { PrismaClient } from "@prisma/client";
import { User } from '@entities/User';
import { IUsersCreateRepository } from '@repositories/IUsersCreateRepository';

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUsersCreateRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({where: {email}});

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Omit<User, "id">): Promise<User> {
    if (!data.name) {
      throw new Error("Name is required to create a user");
    }

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
  }
}