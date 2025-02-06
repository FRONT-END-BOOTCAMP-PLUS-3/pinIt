import { TotalPinList } from '@/application/usecases/admin/pin/dto/TotalPinsListDto';

export const showTotalPin = async () => {
  const response: Response = await fetch('/api/admin-show-pin', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const result: TotalPinList[] = await response.json();

  return result;
};
