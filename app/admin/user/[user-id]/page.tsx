'use client';

import style from '@/app/admin/user/[user-id]/page.module.scss';
import Button from '@/components/Buttons/Button';
import Confirmation from '@/components/Confirmation/Confirmation';

const EditUserPage = () => {
  const role = false;
  const createdDate = '2025-01-01';

  return (
    <div className={style.editUser}>
      <div>프로필 박스</div>
      <div className={style.accountRoleChecker}>
        {role ? (
          <p>관리자 계정</p>
        ) : (
          <>
            <p>일반 계정</p>
            <button>관리자 권한 부여</button>
          </>
        )}
      </div>
      <p>{createdDate + ' 생성'}</p>

      <Button
        label='계정 삭제하기'
        onClickButton={() => {
          console.log('hi');
        }}
      />
      {!role && (
        <Button
          label='관리자 권한 부여'
          onClickButton={() => {
            console.log('hi');
          }}
        />
      )}

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
