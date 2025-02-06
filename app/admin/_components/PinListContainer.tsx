'use client';

import { useEffect, useState } from 'react';
import ROUTES from '@/constants/routes';
import ListComponent from './ListComponent';
import { PinListContainerProps } from './PinListContainerProps';
import { showTotalPin } from '../_api/showTotalPin';
import { TotalPinList } from '@/application/usecases/admin/pin/dto/TotalPinsListDto';
import { deleteCheckedItems } from '../_api/deleteCheckedItems';

const PinListContainer = ({
  searchKeyword,
  sortOption, // placeName을 정렬할 기준(기본값은 최신순 정렬)
  trashClicked,
}: PinListContainerProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [data, setData] = useState<TotalPinList[]>([]); // API로 받아온 핀 목록
  const [filteredData, setFilteredData] = useState<TotalPinList[]>([]); // 검색된 데이터 저장

  // API 호출해서 데이터는 함수
  const fetchPins = async () => {
    try {
      const fetchedData = await showTotalPin();
      const validData = fetchedData.filter((pin) => pin.id !== null);
      setData(validData);
      setFilteredData(validData); // 초기 상태로 전체 데이터 설정
    } catch (error) {
      console.error('핀 목록을 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchPins(); // 컴포넌트 마운트 시 데이터 불러오기
  }, []);

  // searchKeyword에 따라 데이터 필터링
  useEffect(() => {
    if (!searchKeyword || searchKeyword.trim() === '') {
      setFilteredData(data); // 검색어가 없으면 전체 데이터 반환
    } else {
      const lowerSearch = searchKeyword.toLowerCase();
      const filtered = data.filter(
        (pin) =>
          pin.placeName.toLowerCase().includes(lowerSearch) ||
          pin.address.toLowerCase().includes(lowerSearch) ||
          pin.description.toLowerCase().includes(lowerSearch),
      );
      setFilteredData(filtered);
    }
  }, [searchKeyword, data]);

  // trashClicked이벤트가 발생되면 API 호출해서 데이터 삭제하기
  useEffect(() => {
    if (trashClicked && checkedItems.length > 0) {
      deleteCheckedItems(checkedItems);
      deleteCheckedItems(checkedItems).then(() => {
        setCheckedItems([]);
        alert('✅ 핀 삭제가 완료되었습니다.');
        fetchPins(); // 화면 갱신
      });
    }
  }, [trashClicked]);

  return (
    <ListComponent
      data={filteredData}
      setCheckedItems={setCheckedItems}
      checkedItems={checkedItems}
      routePath={ROUTES.pin.detail}
      sortOption={sortOption} // 정렬 방법 전달
      sortKey='id' // 정렬 기준이 될 키 전달
    />
  );
};

export default PinListContainer;
