import { PinRepository } from '@/domain/repositories/PinRepository';

// TotalPinsListUsecase
export const DeletePinUsecase = async (
  pinRepository: PinRepository,
  checkedItems: string[],
): Promise<void> => {
  pinRepository.deletePins(checkedItems);
};
