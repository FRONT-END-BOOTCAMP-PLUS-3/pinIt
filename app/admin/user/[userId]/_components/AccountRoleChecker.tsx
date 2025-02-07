'use client';

import style from '@/app/admin/user/[userId]/page.module.scss';
import { UserDto } from '@/application/usecases/admin/user/dto/UserDto';
import { useEffect, useState } from 'react';

const AccountRoleChecker = ({
  userProfile,
  setUserProfile,
}: {
  userProfile: UserDto | null | undefined;
  setUserProfile: (user: UserDto) => void;
}) => {
  const [isAdmin, setIsAdmin] = useState(userProfile?.admin);

  useEffect(() => {
    setIsAdmin(userProfile?.admin ?? false);
  }, [userProfile]);

  const handleRoleUpdate = async () => {
    if (!userProfile) return;

    const updatedUser = { ...userProfile, admin: !isAdmin };

    const response = await fetch('/api/admin-update-user-role', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...userProfile,
        admin: !isAdmin,
      }),
    });

    if (!response.ok) {
      throw new Error('관리자 권한 업데이트 실패');
    }

    setUserProfile(updatedUser);
  };

  return (
    <div className={style.accountRoleChecker}>
      {Boolean(userProfile?.deleteDate) ? (
        <p>삭제된 계정입니다.</p>
      ) : userProfile?.admin ? (
        <>
          <p>관리자 계정</p>
          <button onClick={handleRoleUpdate}>관리자 권환 회수</button>
        </>
      ) : (
        <>
          <p>일반 계정</p>
          <button onClick={handleRoleUpdate}>관리자 권한 부여</button>
        </>
      )}
    </div>
  );
};

export default AccountRoleChecker;
