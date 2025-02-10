import { UserRepository } from '@/domain/repositories/UserRepository';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

export const DeleteUserUsecase = async (
  userRepository: UserRepository,
  userId: string,
): Promise<void> => {
  const currentUser = await getUserIdFromSupabase();
  const loggedinId = await userRepository.getUserById(userId);

  // 본인 여부 판단
  const isOwnAccount = loggedinId.id === currentUser;

  if (!isOwnAccount) {
    throw new Error('권한이 없습니다.');
  }

  if (loggedinId.deleteDate) {
    throw new Error('이미 삭제된 계정입니다.');
  }

  await userRepository.deleteUsersById([userId]);
};
