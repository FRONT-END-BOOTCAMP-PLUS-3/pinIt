import { ChallengeTopicRepository } from '@/domain/repositories/ChallengeTopicRepository';
import { ChallengeTopicListDto } from './dto/ChallengeTopicListDto';

export const showChallengeTopicListUsecase = async (
  ChallengeTopicRepository: ChallengeTopicRepository,
): Promise<ChallengeTopicListDto | null> => {
  const challengeTopicList = await ChallengeTopicRepository.findAll();

  if (challengeTopicList.length === 0) return null;

  return { challengeTopics: challengeTopicList };
};
