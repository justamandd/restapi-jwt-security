import { User } from '@entities/User';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: Omit<User, 'id'>): Promise<User>;
}