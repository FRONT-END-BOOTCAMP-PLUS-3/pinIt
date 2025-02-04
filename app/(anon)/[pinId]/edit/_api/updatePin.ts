import { CreatePinDto } from '@/application/usecases/pin/dto/CreatePinDto';

export const updatePin = async (pinId: string, updateData: CreatePinDto) => {
  const response: Response = await fetch('/api/update-pin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify({ pinId, updateData }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || '핀 생성 실패');
  }

  return result;
};
