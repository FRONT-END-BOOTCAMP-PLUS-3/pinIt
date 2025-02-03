import { Like } from '../entities/Like';

export interface LikeRepository {
  showLike: () => Promise<Like[]>;
}
