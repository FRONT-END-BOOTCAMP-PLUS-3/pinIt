type UUID = string;

export interface Like {
  userId: UUID; // 사용자 UUID (외래 키, Foreign Key)
  pinId: UUID; // 핀 UUID (외래 키, Foreign Key)
  createdAt: Date | null; // 생성 날짜 (YYYY-MM-DD 형식)
}
