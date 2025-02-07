'use client';

import style from '@/app/admin/user/[userId]/page.module.scss';
import Button from '@/components/Buttons/Button';
import Confirmation from '@/components/Confirmation/Confirmation';
import AccountRoleChecker from './_components/AccountRoleChecker';
import ProfileSummary from '@/app/(anon)/profile/_components/ProfileSummary';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UserDto } from '@/application/usecases/admin/user/dto/UserDto';
import { deleteUser } from '../../_api/deleteUser';

const EditUserPage = () => {
  const params = useParams();
  const userId = params.userId;

  const [userProfile, setUserProfile] = useState<UserDto | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  return (
    <div className={style.editUser}>
      <ProfileSummary />
      <AccountRoleChecker
        userProfile={userProfile}
        setUserProfile={setUserProfile}
      />
      <div className={style.button}>
        {!userProfile?.deleteDate && (
          <Button
            icon='trash'
            label='계정 삭제하기'
            onClickButton={() => setIsModalOpen(true)}
          />
        )}
      </div>
      <Confirmation
        text={'해당 계정을 삭제하시겠습니까?'}
        opened={isModalOpen}
        onClickConfirmation={async () => {
          if (userProfile?.id) {
            await deleteUser([userProfile.id]);
            setIsModalOpen(false);
            fetchUserProfile();
          }
        }}
        modalClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default EditUserPage;
