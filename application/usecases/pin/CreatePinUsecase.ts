import { PinRepository } from '@/domain/repositories/PinRepository';
import { CreatePinDto } from './dto/CreatePinDto';

export const createPinUsecase = async (
  pinRepository: PinRepository,
  data: CreatePinDto,
): Promise<void> => {
  await pinRepository.createPin(data); // 레포지토리로 전달
};
