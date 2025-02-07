import { UserRepository } from '@/domain/repositories/UserRepository';
import { UserDto } from './dto/UserDto';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

export const showUserProfileUsecase = async (
  userRepository: UserRepository,
  userId: string,
): Promise<UserDto> => {
  const currentUserId = await getUserIdFromSupabase();
  const loggedinUser = await userRepository.getUserById(currentUserId);

  if (!loggedinUser.admin) {
    throw new Error('권한이 없습니다.');
  }
  const data = await userRepository.getUserById(userId);

  const userData = {
    id: data.id!,
    nickname: data.nickname,
    email: data.email,
    deleteDate: data.deleteDate,
    admin: data.admin!,
    profileImg: data.profileImg,
    createAt: data.createAt!,
  };

  return userData;
};
