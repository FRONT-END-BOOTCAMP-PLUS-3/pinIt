'use client';

import { useEffect, useState } from 'react';
import style from '@/app/admin/user/[userId]/page.module.scss';
import Button from '@/components/Buttons/Button';
import Confirmation from '@/components/Confirmation/Confirmation';
import AccountRoleChecker from './_components/AccountRoleChecker';
import ProfileSummary from '@/app/(anon)/profile/_components/ProfileSummary';
import { useParams } from 'next/navigation';
import { UserDto } from '@/application/usecases/admin/user/dto/UserDto';

const EditUserPage = () => {
  const params = useParams();
  const userId = params.userId;

  const [userProfile, setUserProfile] = useState<UserDto | null>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response: Response = await fetch('/api/show-user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        setUserProfile(null);
        throw new Error('회원 프로필 요청 실패');
      }

      const result = await response.json();
      setUserProfile(result);
    };

    fetchUserProfile();
  }, [userId]);

  console.log(userProfile);

  return (
    <div className={style.editUser}>
      <ProfileSummary />
      <AccountRoleChecker userData={userProfile} />
      <div className={style.button}>
        {!userProfile?.deleteDate && (
          <Button
            icon='trash'
            label='계정 삭제하기'
            onClickButton={() => {
              console.log('hi');
            }}
          />
        )}
      </div>
      <Confirmation
        text={'hi'}
        opened={false}
        onClickConfirmation={() => {}}
        modalClose={() => {}}
      />
    </div>
  );
};

export default EditUserPage;
