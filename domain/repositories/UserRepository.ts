import { User } from '../entities/User';

export interface UserRepository {
  getUserById: (UserId: string) => Promise<User>;
  showUser: () => Promise<User[]>;
  searchUsersByKeyword: (keyword: string) => Promise<User[]>;
  deleteUsersById: (userIds: string[]) => Promise<void>;
  updateUser(user: User): Promise<void>;
}
