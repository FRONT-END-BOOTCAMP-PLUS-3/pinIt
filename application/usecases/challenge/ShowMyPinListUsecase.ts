import { PinRepository } from '@/domain/repositories/PinRepository';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';
import { extractTwoWordsFromAddress } from '@/hooks/extractTwoWordsFromAddress';
import { MyPinDto } from './dto/MyPinDto';
import { PinJoinedChallengeRepository } from '@/domain/repositories/PinJoinedChallengeRepository';

export const showMyPinListUsecase = async (
  pinRepository: PinRepository,
  pinJoinedChallengeRepository: PinJoinedChallengeRepository,
  topicId: string,
): Promise<MyPinDto[]> => {
  const userId = await getUserIdFromSupabase();
  const pins = await pinRepository.getPinsByUserId(userId || '');
  const pinJoinedChallenge =
    await pinJoinedChallengeRepository.findPindsByChallengeTopicId(topicId);

  // pinJoinedChallenge에 포함되지 않은 핀만 필터링 (some() 사용)
  const filteredPins = pins.filter(
    (pin) =>
      !pinJoinedChallenge.some((joinedPin) => joinedPin.pinId === pin.id),
  );

  // 각 핀의 좋아요 여부 확인 및 주소 가공
  const pinList = filteredPins.map((pin) => {
    return {
      id: pin.id!,
      placeName: pin.placeName,
      address: extractTwoWordsFromAddress(pin.address),
      image: pin.image,
    };
  });

  return pinList;
};
