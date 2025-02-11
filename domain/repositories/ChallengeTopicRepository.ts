import { ChallengeTopic } from '../entities/ChallengeTopic';

export interface ChallengeTopicRepository {
  createChallengeTopic(data: ChallengeTopic): Promise<void>;
  updateChallengeTopic(updateData: ChallengeTopic): Promise<void>;
  findAll(): Promise<ChallengeTopic[]>;
  findThisChallengeTopic(topicId: string): Promise<ChallengeTopic | null>;
  findThisWeekChallengeTopic(): Promise<ChallengeTopic | null>;
}
