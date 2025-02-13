type UUID = string;

export interface ChallengeTopicDto {
  id: UUID | null; // 기본 키 (Primary Key)
  topic: string; // 주제 제목
  createAt: Date; // 생성 날짜
  startDate: Date; // 시작 날짜
  endDate: Date; // 종료 날짜
  adminId: UUID; // 사용자 UUID (외래 키, Foreign Key)
}
