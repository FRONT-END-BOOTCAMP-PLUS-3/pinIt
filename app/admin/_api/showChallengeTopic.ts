import { ChallengeTopicDto } from "@/application/usecases/challenge/dto/ChallengeTopicDto";

export const showChallengeTopic = async (challengeTopicId:string) => {
    if (!challengeTopicId) {
        throw new Error('challengeTopicId가 필요합니다.');
    }

    const response: Response = await fetch(`/api/show-challenge-topic/${challengeTopicId}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    });

    const result: ChallengeTopicDto = await response.json();
    return result;
}