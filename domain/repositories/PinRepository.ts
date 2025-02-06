import { Pin } from '../entities/Pin';

export interface PinRepository {
  createPin: (data: Pin) => Promise<void>; // 핀 생성
  showPin: () => Promise<Pin[]>; // 전체 핀 반환
  findPinsByIdOrderByLike: (pinId: string[] | []) => Promise<Pin[]>; // 아이디로 전체 핀 찾고 like로 정렬
  getPinById: (pinId: string) => Promise<Pin>; // 핀 아이디로 튜플 검색
  getPinsByUserId: (userId: string) => Promise<Pin[]>;
  deletePin: (pinId: string) => Promise<void>; // 핀 삭제
  updatePin: (updateData: Pin) => Promise<void>; // 핀 수정
  searchPinsByKeyword: (keyword: string) => Promise<Pin[]>;
}
