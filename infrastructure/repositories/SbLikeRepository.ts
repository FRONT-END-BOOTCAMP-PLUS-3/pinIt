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

  async createLike(data: Like): Promise<void> {
    const supabase = await createClient();

    // 입력받은 data를 DB에 저장하기 위해 스네이크케이스로 변환
    const formattedData = {
      user_id: data.userId,
      pin_id: data.pinId,
    };
    // null로 받은 애들은 그냥 안보내줘도 됨 (안보내주면 DB에서 자동으로 기본값을 사용해서 저장함)

    const { error } = await supabase
      .from('like')
      .insert(formattedData)
      .select();
    if (error) {
      throw new Error(error.message);
    }
  }

  async findPinIdByUserId(userId: string): Promise<Like[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('like')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    if (!Array.isArray(data)) {
      console.error('🚨 Supabase에서 배열이 아닌 데이터를 반환:', data);
      return [];
    }

    // DB에서 받은 data를 사용하기 위해 카멜케이스로 변환
    const formattedData = data.map((like) => ({
      userId: like.user_id,
      pinId: like.pin_id,
      createdAt: like.created_at,
    }));

    return formattedData || [];
  }

  async deleteLike(pinId: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from('like')
      .delete()
      .in('pin_id', [pinId]);

    if (error) {
      throw new Error(error.message);
    }
  }
}
