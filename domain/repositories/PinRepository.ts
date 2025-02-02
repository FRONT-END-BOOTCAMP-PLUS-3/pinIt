import { PinCreate } from '../entities/pin/CreatePin';

export interface PinRepository {
  createPin: (data: PinCreate) => Promise<void>;
}
