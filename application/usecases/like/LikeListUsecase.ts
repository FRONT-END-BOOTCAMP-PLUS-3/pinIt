import { LikeRepository } from '@/domain/repositories/LikeRepository';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { LikeListDto } from './dto/LikeListDto';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

// 주소에서 두 단어만 추출하는 함수
const extractTwoWords = (address: string): string => {
  const words = address.split(' ');
  return words.slice(0, 2).join(' ');
};

export const likeListUsecase = async (
  PinRepository: PinRepository,
  LikeRepository: LikeRepository,
): Promise<LikeListDto[]> => {
  const userId = await getUserIdFromSupabase();

  const likes = await LikeRepository.findPinIdByUserId(userId);

  if (!Array.isArray(likes) || likes.length === 0) {
    return [];
  }

  const pinId = likes.map((like) => like.pinId);
  const pins = await PinRepository.findPinsById(pinId);

  const pinList = pins.map((pin) => {
    return {
      id: pin.id || ' ',
      placeName: pin.placeName,
      address: extractTwoWords(pin.address),
      image: pin.image,
      isLiked: true,
      userId: pin.userId,
    };
  });

  return pinList;
};
