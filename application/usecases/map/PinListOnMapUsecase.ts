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
  swLat: number,
  swLng: number,
  neLat: number,
  neLng: number,
): Promise<ShowNearByPinList[]> => {
  // 사용자 아이디 받아오기
  const userId = await getUserIdFromSupabase();

  // 모든 좋아요 데이터 가져오기
  const likes = await LikeRepository.showLike();

  // 위도 경도 가져오기
  const boundsPinList = await PinRepository.showBoundsPin(
    // pins,
    swLat,
    swLng,
    neLat,
    neLng,
  );

  // 위도,경도, 좋아요 포함한 데이터 가져오기
  const boundsPins = boundsPinList.map((pin) => {
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

  return boundsPins;
};
