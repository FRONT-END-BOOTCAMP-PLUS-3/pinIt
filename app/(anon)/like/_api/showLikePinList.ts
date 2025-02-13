import { LikeListDto } from '@/application/usecases/like/dto/LikeListDto';

export const showLikePinList = async () => {
  const response: Response = await fetch('/api/show-like-pin-list', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`🚨 서버 오류: ${response.status}`);
  }

  const result: LikeListDto[] = await response.json();

  return result;
};
