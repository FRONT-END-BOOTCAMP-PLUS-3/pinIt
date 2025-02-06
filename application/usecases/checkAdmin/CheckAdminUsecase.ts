import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';
import { CheckAdmin } from './dto/CheckAdminDto';
import { UserRepository } from '@/domain/repositories/UserRepository';

export const checkAdminUsecase = async (
  userRepository: UserRepository,
): Promise<CheckAdmin> => {
  const userId = await getUserIdFromSupabase(); // 로그인된 사용자의 아이디 받아오기

  const loggedinId = await userRepository.getUserById(userId); // 로그인된 사용자의 아이디로 사용자정보 받아오기

  return { isAdmin: Boolean(loggedinId.admin) };
};
