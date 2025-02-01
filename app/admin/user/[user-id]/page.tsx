'use client';

import { useEffect, useState } from 'react';
import style from '@/app/admin/user/[user-id]/page.module.scss';
import Button from '@/components/Buttons/Button';
import Confirmation from '@/components/Confirmation/Confirmation';
import AccountRoleChecker from './_components/AccountRoleChecker';
import ProfileSummary from '@/app/(anon)/profile/_components/ProfileSummary';

const EditUserPage = () => {
  return (
    <div className={style.editUser}>
      {/* <div>프로필 박스</div> */}
      <ProfileSummary />
      <AccountRoleChecker />
      <div className={style.button}>
        <Button
          icon='trash'
          label='계정 삭제하기'
          onClickButton={() => {
            console.log('hi');
          }}
        />
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
