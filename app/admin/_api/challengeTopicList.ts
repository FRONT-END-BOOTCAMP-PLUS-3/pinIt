// 이건 데이터 내용대로 바꾸세요
interface ChallengeTopicData {
  id: string;
  topic: string; // 주제 제목
  createAt: Date; // 생성 날짜
  startDate: Date; // 시작 날짜
  endDate: Date; // 종료 날짜
  adminId: string | null; // 사용자 UUID (외래 키, Foreign Key)
}

export const challengeTopicList = async () => {
    const response = await fetch('/api/show-challenge-topic-list', {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    const result: ChallengeTopicData[] = await response.json();
    return result;
}