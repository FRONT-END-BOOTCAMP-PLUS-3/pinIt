export interface PinJoinedChallengeRepository {
  findPindsByChallengeTopicId(challengeTopicId: string): Promise<string[]>;
}
