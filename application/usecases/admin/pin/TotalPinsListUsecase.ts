import { PinRepository } from '@/domain/repositories/PinRepository';
import { TotalPinList } from './dto/TotalPinsListDto';

// 주소에서 두 단어만 추출하는 함수
const extractTwoWords = (address: string): string => {
  const words = address.split(' ');
  return words.slice(0, 2).join(' ');
};

// TotalPinsListUsecase
export const TotalPinsListUsecase = async (
  pinRepository: PinRepository,
): Promise<TotalPinList[]> => {
  // 모든 핀 리스트 가져오기
  const pins = await pinRepository.showPin();

  const pinList = pins.map((pin) => {
    return {
      id: pin.id || '',
      placeName: pin.placeName,
      address: extractTwoWords(pin.address), // 두 단어만 유지
      description: pin.description,
      captureDate: pin.captureDate,
      tags: pin.tags,
      countLike: pin.countLike ?? 0,
      createAt: pin.createAt ?? new Date(),
      image: pin.image,
      userId: pin.userId,
    };
  });

  return pinList;
};
