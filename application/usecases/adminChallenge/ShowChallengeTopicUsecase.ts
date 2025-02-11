import { SbChallengeTopicRepository } from "@/infrastructure/repositories/SbChallengeTopicRepository";
import { ChallengeTopic } from "@/domain/entities/ChallengeTopic";

export const showChallengeTopicUsecase = async (
    ChallengeTopicRepository: SbChallengeTopicRepository,
    challengeId: string
):Promise<ChallengeTopic | null> => {
    const challengeTopic = await ChallengeTopicRepository.findThisChallengeTopic(challengeId);
    return challengeTopic;
}