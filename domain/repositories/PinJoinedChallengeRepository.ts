import { PinJoinedChallenge } from '../entities/PinJoinedChallenge';

export interface PinJoinedChallengeRepository {
  findPindsByChallengeTopicId(
    challengeTopicId: string | null,
  ): Promise<PinJoinedChallenge[]>;

  createPinJoinedChallenge(data: PinJoinedChallenge[]): Promise<void>;
}
