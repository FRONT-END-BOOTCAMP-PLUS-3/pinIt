type UUID = string;

export interface Like {
  userId: UUID; // 기본 키 (Primary Key)
  pinId: UUID;
  createAt: Date;
}
