import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { createClient } from '@/utils/supabase/server';

export class SbUserRepository implements UserRepository {
  async getUserById(userId: string): Promise<User> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .maybeSingle(); // 단일 데이터 조회

    if (error) {
      throw new Error(error.message);
    }
    // ✅ 데이터가 없으면 기본값 반환
    if (!data) {
      return {
        id: userId,
        nickname: 'Unknown User', // 기본 닉네임
        email: '',
        deleteDate: null,
        admin: false,
        profileImg: '/default-profile.png', // 기본 프로필 이미지
        createAt: new Date(), // 현재 시간
      };
    }

    // DB에서 받은 데이터를 카멜케이스로 변환하여 반환
    return {
      id: data.id,
      nickname: data.nickname,
      email: data.email,
      deleteDate: data.delete_date,
      admin: data.admin,
      profileImg: data.profile_img,
      createAt: data.create_at,
    };
  }
}
