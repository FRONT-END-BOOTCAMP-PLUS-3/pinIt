// 핀을 생성할 때 레포지토리로 보내줘야하는 데이터의 타입

type UUID = string;

export interface PinCreate {
  image: string;
  description: string;
  placeName: string;
  address: string;
  captureDate: Date;
  tags: string[];
  latitude: number;
  longitude: number;
  userId: UUID;
}
