import { ChallengeTopic } from '../entities/ChallengeTopic';

export interface ChallengeTopicRepository {
  findAll(): Promise<ChallengeTopic[]>;
  findThisWeekChallengeTopic(): Promise<ChallengeTopic | null>;
}
