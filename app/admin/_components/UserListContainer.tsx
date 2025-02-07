'use client';

import ListComponent from './ListComponent';
import { useEffect, useState } from 'react';
import ROUTES from '@/constants/routes';
import { PinListContainerProps } from './PinListContainerProps';
import { UserDto } from '@/application/usecases/admin/user/dto/UserDto';
import { deleteUser } from '../_api/deleteUser';

const UserListContainer = ({
  searchKeyword,
  sortOption, // nickname을 정렬할 기준(기본값은 최신순 정렬)
  trashClicked,
}: PinListContainerProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]); // 선택된 아이템들
  const [data, setData] = useState<UserDto[]>([]); // API로 받아온 핀 목록
  const [filteredData, setFilteredData] = useState<UserDto[]>([]); // 검색된 데이터 저장

  const fetchUserList = async () => {
    const response = await fetch('/api/admin-show-user-list');

    if (!response.ok) {
      console.log('생성된 유저가 없습니다.');
      setData([]);
      return;
    }

    const data: UserDto[] = await response.json();

    const formattedData = data.map((user) => ({
      ...user,
      admin: String(user.admin),
    }));

    setData(formattedData);
  };

  // 데이터 렌더링
  useEffect(() => {
    fetchUserList();
  }, []);

  // searchKeyword로 데이터 필터링
  useEffect(() => {
    if (!searchKeyword || searchKeyword.trim() === '') {
      setFilteredData(data);
    } else {
      const lowerSearch = searchKeyword.toLowerCase();
      const filtered = data.filter(
        (user) =>
          user.nickname.toLowerCase().includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch) ||
          (typeof user.admin === 'string' &&
            user.admin.toLowerCase().includes(lowerSearch)),
      );
      setFilteredData(filtered);
    }
  }, [searchKeyword, data]);

  // trash 버튼 이벤트 발생 시
  useEffect(() => {
    if (trashClicked && checkedItems.length > 0) {
      deleteUser(checkedItems).then(() => {
        alert('✅ 해당 유저 정보가 삭제 되었습니다.');
        setCheckedItems([]);
        fetchUserList();
      });
    }
  }, [trashClicked, checkedItems]);

  return (
    <ListComponent
      data={filteredData}
      setCheckedItems={setCheckedItems}
      checkedItems={checkedItems}
      routePath={ROUTES.admin.userDetail} // 클릭시 이동할 경로 전달
      sortOption={sortOption} // 정렬 방법 전달
      sortKey='nickname' // 정렬 기준이 될 키 전달
    />
  );
};

export default UserListContainer;
