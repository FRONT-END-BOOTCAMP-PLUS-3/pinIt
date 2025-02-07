import { PinRepository } from '@/domain/repositories/PinRepository';
import { Pin } from '@/domain/entities/Pin';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';
import { UpdatePinDto } from './dto/UpdatePinDto';

export const editPinUsecase = async (
  pinRepository: PinRepository,
  data: UpdatePinDto,
): Promise<void> => {
  // 현재 로그인된 사용자의 아이디 받아오기
  const userId = await getUserIdFromSupabase();

  // Dto를 인자로 받았고, 레포지토리에는 Pin엔티티의 형태로 전송해줘야 하기 때문에 변환해주기
  // 없는건 걍 null로 보내주면 됨
  const newData: Pin = {
    id: data.id,
    placeName: data.placeName,
    captureDate: data.captureDate,
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude,
    tags: data.tags,
    description: data.description,
    countLike: null,
    createAt: null,
    image: data.image,
    userId: userId,
  };
  await pinRepository.updatePin(newData);
};
