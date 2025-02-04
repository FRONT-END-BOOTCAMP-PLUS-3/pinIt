import { Pin } from '../entities/Pin';

export interface PinRepository {
  createPin: (data: Pin) => Promise<void>;
  showPin: () => Promise<Pin[]>;
  findPinsByIdOrderByLike: (pinId: string[] | []) => Promise<Pin[]>;
  getPinById: (pinId: string) => Promise<Pin>; // 반환 타입 수정
}
