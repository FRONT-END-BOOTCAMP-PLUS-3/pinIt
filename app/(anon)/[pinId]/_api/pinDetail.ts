import { PinDetail } from '@/application/usecases/pin/dto/PinDetailDto';

export const pinDetail = async (pinId: string): Promise<PinDetail> => {
  if (!pinId) {
    throw new Error('pinId가 필요합니다.');
  }

  const response: Response = await fetch(`/api/pin-detail/${pinId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const result: PinDetail = await response.json();
  return result;
};
