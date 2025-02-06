'use client';

import ListComponent from './ListComponent';
import { useEffect, useState } from 'react';
import ROUTES from '@/constants/routes';
import { PinListContainerProps } from './PinListContainerProps';

interface UserData {
  id: string;
  nickname: string;
  email: string;
}
const UserListContainer = ({
  searchKeyword,
  sortOption, // nickname을 정렬할 기준(기본값은 최신순 정렬)
  trashClicked,
}: PinListContainerProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]); // 선택된 아이템들

  useEffect(() => {
    if (trashClicked) {
      console.log('삭제할 항목:', checkedItems);
      // 여기서 삭제 api 호출하기
    }
  }, [trashClicked]);

  const mockData: UserData[] = [
    { id: '1', nickname: '하이룽', email: 'id@email.com' },
    { id: '2', nickname: '안녕하세요', email: 'hello@email.com' },
    { id: '3', nickname: '와우우우우우우우웅', email: 'wow@email.com' },
  ];

  return (
    <ListComponent
      data={mockData}
      setCheckedItems={setCheckedItems}
      checkedItems={checkedItems}
      routePath={ROUTES.admin.userDetail} // 클릭시 이동할 경로 전달
      sortOption={sortOption} // 정렬 방법 전달
      sortKey='nickname' // 정렬 기준이 될 키 전달
    />
  );
};

export default UserListContainer;
