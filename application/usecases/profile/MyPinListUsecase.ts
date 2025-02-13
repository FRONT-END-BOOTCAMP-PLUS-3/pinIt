import { PinRepository } from '@/domain/repositories/PinRepository';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { PinDto } from './dto/PinDto';
import { LikeRepository } from '@/domain/repositories/LikeRepository';

// 주소에서 두 단어만 추출하는 함수
const extractTwoWords = (address: string): string => {
  const words = address.split(' ');
  return words.slice(0, 2).join(' ');
};

export const myPinListUsecase = async (
  pinRepository: PinRepository,
  userRepository: UserRepository,
  userId: string,
  likeRepository: LikeRepository,
): Promise<PinDto[] | null> => {
  //prop으로 전달받은 userId로 사용자 데이터 받아옴
  const userData = await userRepository.getUserById(userId);

  // userId가 null인 경우 처리
  if (!userId) {
    throw new Error('User ID is null');
  }

  // 모든 핀 리스트 가져오기
  const pins = await pinRepository.findPinsByUserId(userId);

  // 모든 좋아요 데이터 가져오기
  const likes = await likeRepository.showLike();

  // 각 핀의 좋아요 여부 확인 및 주소 가공
  const pinList = pins.map((pin) => {
    const isLiked = userId
      ? likes.some((like) => like.pinId === pin.id && like.userId === userId)
      : false; // userId가 없으면 isLiked는 항상 false이도록
    return {
      userId: userId,
      userName: userData.nickname, // userName 추가
      userEmail: userData.email, // userEmail 추가
      id: pin.id || '',
      placeName: pin.placeName,
      address: extractTwoWords(pin.address), // 두 단어만 유지
      image: pin.image,
      isLiked: isLiked,
      countLike: pin.countLike || 0,
    };
  });

  return pinList;
};