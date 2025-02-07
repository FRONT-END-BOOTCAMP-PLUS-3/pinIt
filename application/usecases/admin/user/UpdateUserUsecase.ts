import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';
import { UpdateUserDto } from './dto/UpdateUserDto';

export const UpdateUserUsecase = async (
  userRepository: UserRepository,
  data: UpdateUserDto,
): Promise<void> => {
  const userId = await getUserIdFromSupabase();
  const loggedinId = await userRepository.getUserById(userId);

  // 삭제 권한 여부 판단
  const idAdmin = loggedinId.admin;

  if (!idAdmin) {
    throw new Error('권한이 없습니다.');
  }

  const updatedData: User = {
    id: data.id,
    nickname: data.nickname,
    email: data.email,
    deleteDate: data.deleteDate,
    admin: data.admin,
    profileImg: data.profileImg,
    createAt: data.createAt,
  };

  await userRepository.updateUser(updatedData);
};
