import { User } from '@entities/User';

export interface IUsersAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  updateIsActiveById(id: number): Promise<void>;
}