import { Pin } from '../entities/Pin';

export interface PinRepository {
  createPin: (data: Pin) => Promise<void>; // 핀 생성
  showPin: () => Promise<Pin[]>; // 전체 핀 반환
  findPinsByUserId: (userId: string) => Promise<Pin[]>; // 사용자 아이디로 핀 목록 찾기
  findPinsByIdOrderByLike: (pinId: string[] | []) => Promise<Pin[]>; // 아이디로 전체 핀 찾고 like로 정렬
  getPinById: (pinId: string) => Promise<Pin>; // 핀 아이디로 튜플 검색
  deletePin: (pinId: string) => Promise<void>; // 핀 삭제
  updatePin: (updateData: Pin) => Promise<void>; // 핀 수정
  searchPinsByKeyword: (keyword: string) => Promise<Pin[]>;
  deletePins: (pinIds: string[]) => Promise<void>; // 아이디 리스트 받아서 핀 삭제
}
