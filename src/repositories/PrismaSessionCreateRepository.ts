import { PrismaClient } from "@prisma/client";
import { Session } from "@entities/Session";
import { ISessionsCreateRepository } from "@repositories/ISessionsCreateRepository";

const prisma = new PrismaClient();

export class PrismaSessionCreateRepository implements ISessionsCreateRepository {
  async createSession(data: Omit<Session, "id" | "createAt" | "isValid">): Promise<Session> {
    return await prisma.session.create({
      data: {
        userId: data.userId,
        token: data.token,
        type: data.type,
        expiresAt: data.expiresAt
      }
    });
  }
}