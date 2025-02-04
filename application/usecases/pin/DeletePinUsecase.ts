import { PinRepository } from '@/domain/repositories/PinRepository';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { DeletePin } from '@/application/usecases/pin/dto/DeletePinDto';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

// pinId로 삭제하기
export const pinDetailUsecase = async (
  pinRepository: PinRepository,
  userRepository: UserRepository,
  pinId: string, // 삭제할 핀 ID 받아오기
): Promise<DeletePin | null> => {
  // 현재 로그인된 사용자 아이디 받아오기
  const userId = await getUserIdFromSupabase();

  // pinId에 해당하는 핀 가져오기
  const pin = await pinRepository.getPinById(pinId);
  if (!pin) {
    return null; // 핀이 존재하지 않으면 null 반환
  }

  // userId의 정보 가져오기
  const userProfile = await userRepository.getUserById(pin.userId);
  const loggedinId = await userRepository.getUserById(userId);

  // 삭제 권한 여부 판단 (핀 작성자 == 로그인된 유저 아이디 혹은 로그인된 유저 아이디가 관리자거나)
  const hasPermission =
    userProfile?.id === userId || Boolean(loggedinId?.admin);

  if (!hasPermission) {
    throw new Error('삭제 권한이 없습니다.');
  }

  await pinRepository.deletePin(pinId);

  return {
    pinId: pinId || '',
    deletedBy: userId,
    deletedAt: new Date().toISOString(),
  };
};
