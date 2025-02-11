import { SbChallengeTopicRepository } from "@/infrastructure/repositories/SbChallengeTopicRepository";
import { ChallengeTopicDto } from "../challenge/dto/ChallengeTopicDto";

export const challengeTopicsListUsecase = async (
    ChallengeTopicRepository: SbChallengeTopicRepository
):Promise<ChallengeTopicDto[]> => {
    const challengeTopicsList = await ChallengeTopicRepository.findAll();

    return challengeTopicsList;
};