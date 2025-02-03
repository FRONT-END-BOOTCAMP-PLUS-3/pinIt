import { Like } from '../entities/like/Like';

export interface LikeRepository {
  showLike: () => Promise<Like[]>;
}
