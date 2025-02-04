import { PinJoinedChallenge } from '../entities/PinJoinedChallenge';

export interface PinJoinedChallengeRepository {
  findPindsByChallengeTopicId(
    challengeTopicId: string | null,
  ): Promise<PinJoinedChallenge[]>;
}
