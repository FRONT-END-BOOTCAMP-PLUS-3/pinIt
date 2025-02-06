import { ShowNearByPinList } from '@/application/usecases/map/dto/ShowNearByPinListDto';

export const showNearByPinList = async () => {
  const response: Response = await fetch('/api/show-nearby-pin-list', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const result: ShowNearByPinList[] = await response.json();

  return result;
};
