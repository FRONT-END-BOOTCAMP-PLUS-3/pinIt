import { PinRepository } from '@/domain/repositories/PinRepository';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';
import { extractTwoWordsFromAddress } from '@/hooks/extractTwoWordsFromAddress';
import { MyPinDto } from './dto/MyPinDto';

export const showMyPinListUsecase = async (
  pinRepository: PinRepository,
): Promise<MyPinDto[]> => {
  const userId = await getUserIdFromSupabase();
  const pins = await pinRepository.getPinsByUserId(userId);

  // 각 핀의 좋아요 여부 확인 및 주소 가공
  const pinList = pins.map((pin) => {
    return {
      id: pin.id!,
      placeName: pin.placeName,
      address: extractTwoWordsFromAddress(pin.address),
      image: pin.image,
    };
  });

  return pinList;
};
