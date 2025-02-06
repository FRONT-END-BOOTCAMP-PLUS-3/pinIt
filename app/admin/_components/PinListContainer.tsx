'use client';

import { useEffect, useState } from 'react';
import ROUTES from '@/constants/routes';
import ListComponent from './ListComponent';
import { PinListContainerProps } from './PinListContainerProps';
import { showTotalPin } from '../_api/showTotalPin';
import { TotalPinList } from '@/application/usecases/admin/pin/dto/TotalPinsListDto';

const PinListContainer = ({
  searchKeyword,
  sortOption, // placeName을 정렬할 기준(기본값은 최신순 정렬)
  trashClicked,
}: PinListContainerProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [data, setData] = useState<TotalPinList[]>([]); // API로 받아온 핀 목록

  // API 호출해서 데이터 받아오기
  useEffect(() => {
    const fetchPins = async () => {
      try {
        const data = await showTotalPin();
        setData(data.filter((pin) => pin.id !== null));
      } catch (error) {
        console.error('핀 목록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchPins();
  }, []);

  // trashClicked이벤트가 발생되면 API 호출해서 데이터 삭제하기
  useEffect(() => {
    if (trashClicked) {
      console.log('삭제할 항목:', checkedItems);
      // 여기서 삭제 api 호출하기
    }
  }, [trashClicked]);

  return (
    <ListComponent
      data={data}
      setCheckedItems={setCheckedItems}
      checkedItems={checkedItems}
      routePath={ROUTES.pin.detail}
      sortOption={sortOption} // 정렬 방법 전달
      sortKey='id' // 정렬 기준이 될 키 전달
    />
  );
};

export default PinListContainer;
