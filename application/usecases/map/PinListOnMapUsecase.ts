import { LikeRepository } from '@/domain/repositories/LikeRepository';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { ShowNearByPinList } from './dto/ShowNearByPinListDto';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

// 주소에서 두 단어만 추출하는 함수
const extractTwoWords = (address: string): string => {
  const words = address.split(' ');
  return words.slice(0, 2).join(' ');
};

// showPinList유즈케이스
export const showNearByPinListUsecase = async (
  PinRepository: PinRepository,
  LikeRepository: LikeRepository,
): Promise<ShowNearByPinList[]> => {
  // 사용자 아이디 받아오기
  const userId = await getUserIdFromSupabase();

  // 모든 핀 리스트 가져오기
  const pins = await PinRepository.showPin();

  // 모든 좋아요 데이터 가져오기
  const likes = await LikeRepository.showLike();

  // 각 핀의 좋아요 여부 확인 및 주소 가공
  const pinList = pins.map((pin) => {
    const isLiked = likes.some(
      (like) => like.pinId === pin.id && like.userId === userId,
    );
    return {
      id: pin.id || ' ',
      placeName: pin.placeName,
      address: extractTwoWords(pin.address), // 두 단어만 유지
      description: pin.description,
      image: pin.image,
      isLiked: isLiked,
    };
  });

  // 검색한 장소 위도 경도에 맞는 범위 정하기 -> 레파지토리에 보내기

  return pinList;
};
