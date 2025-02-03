import { Like } from '@/domain/entities/Like';
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

    // DB에서 받은 data를 사용하기 위해 카멜케이스로 변환
    const formattedData = data.map((pin) => ({
      userId: pin.user_id,
      pinId: pin.pin_id,
      createdAt: pin.created_at,
    }));

    return formattedData || [];
  }
}
