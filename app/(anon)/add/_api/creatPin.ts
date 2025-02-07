import { CreatePinDto } from '@/application/usecases/pin/dto/CreatePinDto';

export const createPin = async (pinData: CreatePinDto) => {
  const response: Response = await fetch('/api/create-pin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(pinData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || '핀 생성 실패');
  }

  return result;
};
