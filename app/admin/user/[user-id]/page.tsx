'use client';

import style from '@/app/admin/user/[user-id]/page.module.scss';
import Button from '@/components/Buttons/Button';
import Confirmation from '@/components/Confirmation/Confirmation';
import AccountRoleChecker from './_components/accountRoleChecker';

const EditUserPage = () => {
  return (
    <div className={style.editUser}>
      <div>프로필 박스</div>
      <AccountRoleChecker />
      <Button
        label='계정 삭제하기'
        onClickButton={() => {
          console.log('hi');
        }}
      />
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
