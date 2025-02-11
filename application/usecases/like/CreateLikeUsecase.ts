import { LikeRepository } from '@/domain/repositories/LikeRepository';
import { CreateLikeDto } from './dto/CreateLikeDto';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';
import { Like } from '@/domain/entities/Like';

export const createLikeUsecase = async (
  likeRepository: LikeRepository,
  data: CreateLikeDto,
): Promise<void> => {
  // 현재 로그인된 사용자의 아이디 받아오기
  const userId = await getUserIdFromSupabase();

  // Dto를 인자로 받았고, 레포지토리에는 Pin엔티티의 형태로 전송해줘야 하기 때문에 변환해주기
  // 없는건 걍 null로 보내주면 됨
  const newData: Like = {
    userId: userId,
    pinId: data.id,
    createdAt: null,
  };

  await likeRepository.createLike(newData);
};
