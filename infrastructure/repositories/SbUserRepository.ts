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
  async showUser(): Promise<User[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .order('create_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    // DB에서 받은 data를 사용하기 위해 카멜케이스로 변환
    const formattedData = data.map((user) => ({
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      deleteDate: user.delete_date,
      admin: user.admin,
      profileImg: user.profile_img,
      createAt: user.create_at,
    }));

    return formattedData || [];
  }
  async searchUsersByKeyword(keyword: string): Promise<User[]> {
    if (!keyword.trim()) return []; // 빈 검색어 방지

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .or(`nickname.ilike.%${keyword}%`)
      .order('create_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    // ✅ 검색된 데이터를 변환하여 반환
    return data.map((user) => ({
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      deleteDate: user.delete_date,
      admin: user.admin,
      profileImg: user.profile_img || '/default-profile.png', // 기본 프로필 이미지
      createAt: user.create_at,
    }));
  }

  async deleteUsersById(userIds: string[]): Promise<void> {
    if (userIds.length === 0) throw new Error('No userId in parameter');

    const supabase = await createClient();
    const currentTime = new Date().toISOString();

    const { error } = await supabase
      .from('user')
      .update({ delete_date: currentTime })
      .in('id', userIds)
      .select('*')
      .order('create_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to delete users: ${error.message}`);
    }
  }

  async updateUser(user: User): Promise<void> {
    const supabase = await createClient();

    const formattedData = {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      delete_date: user.deleteDate,
      admin: user.admin,
      profile_img: user.profileImg,
      create_at: user.createAt,
    };

    const { error } = await supabase
      .from('user')
      .update(formattedData)
      .eq('id', user.id);

    if (error) {
      throw new Error(error.message);
    }
  }
}
