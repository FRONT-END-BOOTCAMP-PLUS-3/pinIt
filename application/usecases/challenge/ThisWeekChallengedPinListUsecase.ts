import { ChallengeTopic } from '@/domain/entities/ChallengeTopic';
import { ChallengeTopicRepository } from '@/domain/repositories/ChallengeTopicRepository';

export const thisWeekChallengedPinListUsecase = async (
  ChallengeTopicRepository: ChallengeTopicRepository,
): Promise<ChallengeTopic | null> => {
  return await ChallengeTopicRepository.findThisWeekChallengeTopic();
};
