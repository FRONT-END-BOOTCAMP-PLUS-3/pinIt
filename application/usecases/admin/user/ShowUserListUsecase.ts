import { UserRepository } from '@/domain/repositories/UserRepository';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';
import { UserDto } from './dto/UserDto';

export const showUserListUsecase = async (
  userRepository: UserRepository,
): Promise<UserDto[]> => {
  const userId = await getUserIdFromSupabase();
  const loggedinId = await userRepository.getUserById(userId);

  // 삭제 권한 여부 판단
  const isAdmin = loggedinId.admin;

  if (!isAdmin) {
    throw new Error('권한이 없습니다.');
  }

  // userId의 정보 가져오기

  const userListData = await userRepository.showUser();

  const userList: UserDto[] = userListData.map((user) => ({
    ...user,
    id: user.id ?? '',
    admin: user.admin !== null ? user.admin : false,
    createAt: user.createAt ?? new Date(),
  }));

  return userList;
};
