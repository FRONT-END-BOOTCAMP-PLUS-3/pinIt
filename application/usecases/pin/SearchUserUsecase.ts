import { UserRepository } from '@/domain/repositories/UserRepository';
import { SearchUserDto } from './dto/SearchUserDto';

// Search 유즈케이스 (키워드 검색 적용)
export const searchUserUsecase = async (
  userRepository: UserRepository,
  keyword: string, // 검색 키워드 추가
): Promise<SearchUserDto[]> => {
  // 검색 키워드가 없으면 전체 핀을 가져오고, 있으면 키워드 검색 수행
  const users = keyword.trim()
    ? await userRepository.searchUsersByKeyword(keyword)
    : await userRepository.showUser();

  return users.map((user) => {
    return {
      id: user.id || ' ',
      nickname: user.nickname || ' ',
      profileImg: user.profileImg || ' ',
    };
  });
};
