import { CreateLikeDto } from '@/application/usecases/like/dto/CreateLikeDto';

export const createLike = async (likeData: CreateLikeDto) => {
  const response: Response = await fetch('/api/create-like', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(likeData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || '좋아요 생성 실패');
  }

  return result;
};
