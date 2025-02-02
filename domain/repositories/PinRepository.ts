import { PinCreate } from '../entities/PinCreate';

export interface PinRepository {
  createPin: (data: PinCreate) => Promise<void>;
}
