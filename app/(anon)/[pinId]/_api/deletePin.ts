import { PinDetail } from '@/application/usecases/pin/dto/PinDetailDto';

export const deletePin = async (pinId: string): Promise<PinDetail> => {
  if (!pinId) {
    throw new Error('pinId가 필요합니다.');
  }

  const response: Response = await fetch(`/api/delete-pin/${pinId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  const result: PinDetail = await response.json();
  return result;
};
