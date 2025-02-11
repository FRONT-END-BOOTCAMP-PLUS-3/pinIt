import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';
import { CheckAdmin } from './dto/CheckAdminDto';
import { UserRepository } from '@/domain/repositories/UserRepository';

export const checkAdminUsecase = async (
  userRepository: UserRepository,
): Promise<CheckAdmin> => {
  const userId = await getUserIdFromSupabase(); // 로그인된 사용자의 아이디 받아오기

  if (!userId) {
    return { isAdmin: false }; // 로그인 정보 없으면 무조건 isAdmin: false로 반환
  } else {
    const loggedinId = await userRepository.getUserById(userId); // 로그인된 사용자의 아이디로 사용자정보 받아오기
    return { isAdmin: Boolean(loggedinId.admin) };
  }
};
