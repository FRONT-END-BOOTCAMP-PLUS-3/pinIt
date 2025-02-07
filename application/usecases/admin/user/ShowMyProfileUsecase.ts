import { UserRepository } from '@/domain/repositories/UserRepository';
import { UserDto } from './dto/UserDto';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

export const showMyProfileUsecase = async (
  userRepository: UserRepository
): Promise<UserDto> => {
  const currentUserId = await getUserIdFromSupabase();
  if (!currentUserId) {
    console.log("로그인된 유저 정보를 불러올 수 없습니다.");
  }
  const userListData = await userRepository.getUserById(currentUserId);

  return userListData;
};
