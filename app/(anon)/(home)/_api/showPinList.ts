import { ShowPinList } from '@/application/usecases/pin/dto/ShowPinListDto';

export const showPinList = async () => {
  const response: Response = await fetch('/api/show-pin-list', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const result: ShowPinList[] = await response.json();

  return result;
};
