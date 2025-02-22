import { LikeRepository } from '@/domain/repositories/LikeRepository';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { ShowPinList } from './dto/ShowPinListDto';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

// 주소에서 두 단어만 추출하는 함수
const extractTwoWords = (address: string): string => {
  const words = address.split(' ');
  return words.slice(0, 2).join(' ');
};

// showPinList유즈케이스
export const showPinListUsecase = async (
  pinRepository: PinRepository,
  likeRepository: LikeRepository,
): Promise<ShowPinList[]> => {
  // 사용자 아이디 받아오기
  const userId = await getUserIdFromSupabase();

  // 모든 핀 리스트 가져오기
  const pins = await pinRepository.showPin();

  // 모든 좋아요 데이터 가져오기
  const likes = await likeRepository.showLike();

  // 각 핀의 좋아요 여부 확인 및 주소 가공
  const pinList = pins.map((pin) => {
    const isLiked = userId
      ? likes.some((like) => like.pinId === pin.id && like.userId === userId)
      : false; // userId가 없으면 isLiked는 항상 false이도록
    return {
      id: pin.id || ' ',
      placeName: pin.placeName,
      address: extractTwoWords(pin.address), // 두 단어만 유지
      image: pin.image,
      isLiked: isLiked,
      userId: pin.userId,
      countLike: pin.countLike || 0,
    };
  });

  return pinList;
};
