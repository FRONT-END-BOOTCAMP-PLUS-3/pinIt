type UUID = string;

export interface TotalPinList {
  id: UUID; // 기본 키 (Primary Key)
  placeName: string; // 장소 이름
  captureDate: Date; // 촬영 날짜 (YYYY-MM-DD 형식)
  address: string; // 주소
  tags: string[]; // 태그
  description: string; // 설명
  countLike: number; // 좋아요 개수
  createAt: Date; // 생성 날짜 (YYYY-MM-DD 형식)
  image: string; // 이미지 URL 또는 경로
  userId: UUID; // 사용자 UUID (외래 키, Foreign Key)
}
