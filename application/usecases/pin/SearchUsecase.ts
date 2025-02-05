import { LikeRepository } from '@/domain/repositories/LikeRepository';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { ShowPinList } from './dto/ShowPinListDto';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

// 주소에서 두 단어만 추출하는 함수
const extractTwoWords = (address: string): string => {
  const words = address.split(' ');
  return words.slice(0, 2).join(' ');
};

// Search 유즈케이스 (키워드 검색 적용)
export const SearchUsecase = async (
  pinRepository: PinRepository,
  likeRepository: LikeRepository,
  keyword: string, // 검색 키워드 추가
): Promise<ShowPinList[]> => {
  // 사용자 아이디 받아오기
  const userId = await getUserIdFromSupabase();

  // 검색 키워드가 없으면 전체 핀을 가져오고, 있으면 키워드 검색 수행
  const pins = keyword.trim()
    ? await pinRepository.searchPinsByKeyword(keyword)
    : await pinRepository.showPin();

  // 모든 좋아요 데이터 가져오기
  const likes = await likeRepository.showLike();

  // 각 핀의 좋아요 여부 확인 및 주소 가공
  const pinList = pins.map((pin) => {
    const isLiked = likes.some(
      (like) => like.pinId === pin.id && like.userId === userId,
    );
    return {
      id: pin.id || ' ',
      placeName: pin.placeName,
      address: extractTwoWords(pin.address), // 두 단어만 유지
      image: pin.image,
      isLiked: isLiked,
    };
  });

  return pinList;
};
