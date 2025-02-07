import { UserRepository } from '@/domain/repositories/UserRepository';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

export const DeleteUserUsecase = async (
  userRepository: UserRepository,
  userIds: string[],
): Promise<void> => {
  const userId = await getUserIdFromSupabase();
  const loggedinId = await userRepository.getUserById(userId);

  // 삭제 권한 여부 판단
  const idAdmin = loggedinId.admin;

  if (!idAdmin) {
    throw new Error('권한이 없습니다.');
  }

  await userRepository.deleteUsersById(userIds);
};
