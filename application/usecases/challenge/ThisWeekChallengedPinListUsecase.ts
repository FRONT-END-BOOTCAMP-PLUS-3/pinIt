import { ChallengeTopicRepository } from '@/domain/repositories/ChallengeTopicRepository';
import { PinJoinedChallengeRepository } from '@/domain/repositories/PinJoinedChallengeRepository';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { ThisWeekChallengedPinListDto } from './dto/ThisWeekChallengedPinListDto';

export const thisWeekChallengedPinListUsecase = async (
  ChallengeTopicRepository: ChallengeTopicRepository,
  PinJoinedChallengeRepository: PinJoinedChallengeRepository,
  PinRepository: PinRepository,
): Promise<ThisWeekChallengedPinListDto | null> => {
  const thisWeekChallengeTopic =
    await ChallengeTopicRepository.findThisWeekChallengeTopic();

  if (!thisWeekChallengeTopic) {
    return null;
  }

  const pinJoinedChallenge =
    await PinJoinedChallengeRepository.findPindsByChallengeTopicId(
      thisWeekChallengeTopic.id,
    );

  const pinJoinedChallengeId =
    pinJoinedChallenge.length === 0
      ? []
      : pinJoinedChallenge.map((pin) => pin.pinId);

  const pins =
    await PinRepository.findPinsByIdOrderByLike(pinJoinedChallengeId);

  return { pins };
};
