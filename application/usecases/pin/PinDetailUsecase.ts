import { LikeRepository } from '@/domain/repositories/LikeRepository';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { PinDetail } from './dto/PinDetailDto';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

// pinId 기반 상세 정보 조회
export const pinDetailUsecase = async (
  pinRepository: PinRepository,
  likeRepository: LikeRepository,
  userRepository: UserRepository,
  pinId: string, // 특정 핀 ID 조회
): Promise<PinDetail | null> => {
  // 사용자 아이디 받아오기
  const userId = await getUserIdFromSupabase();

  // pinId에 해당하는 핀 가져오기
  const pin = await pinRepository.getPinById(pinId);
  if (!pin) {
    return null; // 핀이 존재하지 않으면 null 반환
  }

  // userId가 pinId에 좋아요 눌렀는지 여부 확인
  const likes = await likeRepository.showLike();
  const isLiked = likes.some(
    (like) => like.pinId === pin.id && like.userId === userId,
  );

  // userId의 정보 가져오기
  const userProfile = await userRepository.getUserById(pin.userId);

  // 편집/삭제 권한 여부 판단 (핀 작성자 == 로그인된 유저 아이디)
  const hasPermission =
    userProfile?.id === userId || Boolean(userProfile?.admin);

  // 상세 정보 반환
  return {
    image: pin.image,
    nickname: userProfile?.nickname || '사용자',
    userId: userProfile?.id || '',
    profileImg: userProfile?.profileImg || '/default-profile-img.jpg', // userId의 프로필 이미지
    isLiked: isLiked,
    countLike: pin.countLike ?? 0, // null이면 0으로 설정
    placeName: pin.placeName,
    captureDate: pin.captureDate,
    description: pin.description,
    tags: pin.tags,
    address: pin.address,
    latitude: pin.latitude,
    longitude: pin.longitude,
    hasPermission: hasPermission,
  };
};
