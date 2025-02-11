import { Like } from '../entities/Like';

export interface LikeRepository {
  showLike: () => Promise<Like[]>;
  findPinIdByUserId: (userId: string) => Promise<Like[]>;
  createLike: (data: Like) => Promise<void>;
}
