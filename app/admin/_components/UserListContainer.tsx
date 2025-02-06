'use client';

import ListComponent from './ListComponent';
import { useState } from 'react';
import ROUTES from '@/constants/routes';

interface UserData {
  id: string;
  nickname: string;
  email: string;
}

const UserListContainer = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

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
      routePath={ROUTES.admin.userDetail}
    />
  );
};

export default UserListContainer;
