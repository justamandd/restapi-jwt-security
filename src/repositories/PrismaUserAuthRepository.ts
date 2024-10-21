import { PrismaClient } from "@prisma/client";
import { User } from '@entities/User';
import { IUsersAuthRepository } from "@repositories/IUsersAuthRepository";

const prisma = new PrismaClient();

export class PrismaUserAuthRepository implements IUsersAuthRepository {
  async updateIsActiveById(id: number): Promise<void> {
    await prisma.user.update({where: {id}, data: {isActive: true}});
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({where: {email}});

    if (!user) {
      return null;
    }

    return user;
  }
}