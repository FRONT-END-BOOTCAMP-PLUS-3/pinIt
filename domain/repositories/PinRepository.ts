import { CreatePinDto } from '@/application/usecases/pin/dto/CreatePinDto';
import { Pin } from '../entities/Pin';

export interface PinRepository {
  createPin: (data: CreatePinDto) => Promise<void>;
  showPin: () => Promise<Pin[]>;
}
