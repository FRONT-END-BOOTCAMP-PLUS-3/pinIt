import { SbLikeRepository } from '@/infrastructure/repositories/SbLikeRepository';
import { SbPinJoinedChallengeRepository } from '@/infrastructure/repositories/SbPinJoinedChallengeRepository';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';
import { extractTwoWordsFromAddress } from '@/hooks/extractTwoWordsFromAddress';
import { ShowPinList } from '../pin/dto/ShowPinListDto';

export const showChallengedPinListUsecase = async (
  PinJoinedChallengedRepository: SbPinJoinedChallengeRepository,
  PinRepository: SbPinRepository,
  LikeRepository: SbLikeRepository,
  topicId: string,
): Promise<ShowPinList[]> => {
  // 특정 챌린지 주제에 참여 중인 핀들을 가져와서 id만 반환
  const challengedPinIdListByTopic =
    await PinJoinedChallengedRepository.findPindsByChallengeTopicId(topicId);
  //   .map((chllengedPin) => chllengedPin.challengeTopicId);

  const chllengedPinId = challengedPinIdListByTopic.map(
    (challengedPin) => challengedPin.pinId,
  );

  // 좋아요 순으로 정렬된 핀 id로 검색
  const challengedPinList =
    await PinRepository.findPinsByIdOrderByLike(chllengedPinId);

  const userId = await getUserIdFromSupabase();
  const likes = await LikeRepository.showLike();

  const pinList = challengedPinList
    .map((challengedPin) => {
      const isLiked = likes.some(
        (like) => like.pinId === challengedPin.id && like.userId === userId,
      );

      return {
        id: challengedPin.id || ' ',
        placeName: challengedPin.placeName,
        address: extractTwoWordsFromAddress(challengedPin.address), // 두 단어만 유지
        image: challengedPin.image,
        isLiked: isLiked,
        userId: challengedPin.userId,
        countLike: challengedPin.countLike || 0,
      };
    })
    .sort((a, b) => b.countLike - a.countLike);

  return pinList;
};
