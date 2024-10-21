import { User } from '@entities/User';

export interface IUsersCreateRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: Omit<User, 'id'>): Promise<User>;
}