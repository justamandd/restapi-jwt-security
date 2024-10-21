import { Session } from "@entities/Session";

export interface ISessionsCreateRepository {
  createSession(data: Omit<Session, 'id' | 'createAt' | 'isValid'>): Promise<Session>;
}