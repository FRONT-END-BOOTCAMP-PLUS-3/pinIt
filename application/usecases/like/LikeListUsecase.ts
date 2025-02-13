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

  const likes = userId ? await LikeRepository.findPinIdByUserId(userId) : [];

  if (!Array.isArray(likes) || likes.length === 0) {
    return [];
  }

  // likes.map((like) => like.createdAt);

  const pinIds = likes.map((like) => like.pinId);
  const pins = await PinRepository.findPinsById(pinIds);

  // Map을 활용해 pinId에 해당하는 핀 데이터를 빠르게 찾기
  const pinMap = new Map(pins.map((pin) => [pin.id, pin]));

  // pinIds 순서대로 `pins` 배열 정렬 (없는 pinId는 제거)
  const sortedPins = pinIds
    .map((id) => pinMap.get(id)) // 존재하는 핀만 가져오기
    .filter((pin): pin is typeof pin => pin !== null); // `undefined` 제거

  // 최종 데이터 변환
  return sortedPins.map((pin) => ({
    id: pin?.id || ' ',
    placeName: pin?.placeName,
    address: extractTwoWords(pin?.address ?? ''),
    image: pin?.image,
    isLiked: true,
    userId: pin?.userId,
    createdAt: pin?.createAt, // 정렬을 like.created_at 기준으로 유지
  }));

  // const pinList = pins.map((pin) => {
  //   return {
  //     id: pin.id || ' ',
  //     placeName: pin.placeName,
  //     address: extractTwoWords(pin.address),
  //     image: pin.image,
  //     isLiked: true,
  //     userId: pin.userId,
  //     createdAt: pin.createAt,
  //   };
  // });

  // return pinList;
};
