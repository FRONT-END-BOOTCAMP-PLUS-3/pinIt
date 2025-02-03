import { CreatePin } from '../entities/pin/CreatePin';
import { Pin } from '../entities/pin/Pin';

export interface PinRepository {
  createPin: (data: CreatePin) => Promise<void>;
  showPin: () => Promise<Pin[]>;
}
