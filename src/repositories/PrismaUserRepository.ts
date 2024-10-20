import { PrismaClient } from "@prisma/client";
import { User } from '@entities/User';
import { IUsersRepository } from '@repositories/IUsersRepository';

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({where: {email}});

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Omit<User, "id">): Promise<User> {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
  }
}