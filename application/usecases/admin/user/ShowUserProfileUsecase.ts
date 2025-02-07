import { UserRepository } from '@/domain/repositories/UserRepository';
import { UserDto } from './dto/UserDto';
import { checkIsAdmin } from '@/hooks/chekcIsAdmin';
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
  const userListData = await userRepository.getUserById(userId);

  return userListData;
};
