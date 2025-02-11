import { ChallengeTopicDto } from "@/application/usecases/challenge/dto/ChallengeTopicDto";

export const updateChallengeTopic = async (
    challengeTopicId: string, receivedData: ChallengeTopicDto
) => {
    // startDate의 시간을 00:00:01로 설정
    const formattedStartDate = receivedData.startDate
        ? new Date(new Date(receivedData.startDate).getTime() + 1000).toISOString()
        : null;

    // endDate의 시간을 23:59:59로 설정
    const formattedEndDate = receivedData.endDate
        ? new Date(new Date(receivedData.endDate).getTime() + (23 * 60 * 60 * 1000) + (59 * 60 * 1000) + (59 * 1000)).toISOString()
        : null;

    // 서버로 전송할 데이터 변환
    const updateData = {
        ...receivedData,
        startDate: formattedStartDate ? new Date(formattedStartDate).toISOString() : null,
        endDate: formattedEndDate ? new Date(formattedEndDate).toISOString() : null,
    };

    const response: Response = await fetch(`/api/update-challenge-topic/${challengeTopicId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || '챌린지 주제 수정 실패');
    }
}