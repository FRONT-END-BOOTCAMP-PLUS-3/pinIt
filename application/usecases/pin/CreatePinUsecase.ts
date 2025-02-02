import { CreatePinDto } from './dto/CreatePinDto';
import { PinRepository } from '@/domain/repositories/PinRepository';

export const createPin = async (
  pinRepository: PinRepository,
  data: CreatePinDto,
): Promise<void> => {
  // PinRepository와 Pin데이블에 추가할 데이터를 인자로 받으면 됨
  await pinRepository.createPin(data); // 레포지토리로 전달
};
