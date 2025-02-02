// 핀을 생성할 때 레포지토리로 보내줘야하는 데이터의 타입

type UUID = string;

export interface PinCreate {
  image: string;
  description: string;
  place_name: string;
  address: string;
  capture_date: Date;
  tags: string[];
  latitude: number;
  longitude: number;
  user_id: UUID;
}
