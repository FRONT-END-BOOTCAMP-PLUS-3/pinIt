import { UserRepository } from '@/domain/repositories/UserRepository';
import { ProfileDto } from './dto/ProfileDto';

export const showUserProfileUsecase = async (
  userRepository: UserRepository,
  userId: string,
): Promise<ProfileDto> => {
  const userListData = await userRepository.getUserById(userId);

  return userListData;
};
