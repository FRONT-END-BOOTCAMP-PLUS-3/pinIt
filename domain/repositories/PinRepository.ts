import { Pin } from '../entities/Pin';

export interface PinRepository {
  createPin: (data: Pin) => Promise<void>;
  showPin: () => Promise<Pin[]>;
}
