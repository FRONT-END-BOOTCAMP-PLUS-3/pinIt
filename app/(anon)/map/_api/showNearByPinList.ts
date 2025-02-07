import { ShowNearByPinList } from '@/application/usecases/map/dto/ShowNearByPinListDto';

export const showNearByPinList = async (bounds: any) => {
  if (!bounds.sw || !bounds.ne) {
    console.error(
      'showNearByPinList에 전달된 bounds 값이 올바르지 않습니다.',
      bounds,
    );
    return [];
  }

  const params = new URLSearchParams({
    swLat: bounds.sw.Ma,
    swLng: bounds.sw.La,
    neLat: bounds.ne.Ma,
    neLng: bounds.ne.La,
  });

  const response: Response = await fetch(
    `/api/show-nearby-pin-list?${params.toString()}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  const result: ShowNearByPinList[] = await response.json();

  return result;
};
