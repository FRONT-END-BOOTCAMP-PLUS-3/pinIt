import { Like } from '@/domain/entities/like/Like';
import { LikeRepository } from '@/domain/repositories/LikeRepository';
import { createClient } from '@/utils/supabase/server';

export class SbLikeRepository implements LikeRepository {
  async showLike(): Promise<Like[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('like')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  }
}
