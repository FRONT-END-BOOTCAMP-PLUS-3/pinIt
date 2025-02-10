import { SbPinJoinedChallengeRepository } from '@/infrastructure/repositories/SbPinJoinedChallengeRepository';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { PinJoinedChallengeDto } from './dto/PinJoinedChallengeDto';
import { extractTwoWordsFromAddress } from '@/hooks/extractTwoWordsFromAddress';

export const showChallengedPinListUsecase = async (
  PinJoinedChallengedRepository: SbPinJoinedChallengeRepository,
  PinRepository: SbPinRepository,
  topicId: string,
): Promise<PinJoinedChallengeDto[]> => {
  // 특정 챌린지 주제에 참여 중인 핀들을 가져와서 id만 반환
  const challengedPinIdListByTopic =
    await PinJoinedChallengedRepository.findPindsByChallengeTopicId(topicId);

  const chllengedPinId = challengedPinIdListByTopic.map(
    (challengedPin) => challengedPin.pinId,
  );

  // 좋아요 순으로 정렬된 핀 id로 검색
  const challengedPinList =
    await PinRepository.findPinsByIdOrderByLike(chllengedPinId);

  const sortedPinList = challengedPinList.sort((a, b) => {
    const dateA = new Date(a.createAt!);
    const dateB = new Date(b.createAt!);

    return dateA.getTime() - dateB.getTime();
  });

  const pinList = sortedPinList.map((pin) => {
    return {
      id: pin.id || '',
      placeName: pin.placeName,
      address: extractTwoWordsFromAddress(pin.address), // 두 단어만 유지
      description: pin.description,
      captureDate: pin.captureDate,
      tags: pin.tags,
      countLike: pin.countLike ?? 0,
      createAt: pin.createAt ?? new Date(),
      image: pin.image,
      userId: pin.userId,
    };
  });

  return pinList;
};
