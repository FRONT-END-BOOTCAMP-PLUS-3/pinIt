import { User } from '../entities/User';

export interface UserRepository {
  getUserById: (UserId: string) => Promise<User>;
}
