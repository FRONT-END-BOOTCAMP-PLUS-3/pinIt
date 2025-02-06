'use client';

import style from '@/app/admin/user/[userId]/page.module.scss';

const AccountRoleChecker = () => {
  const role = false;

  return (
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
  );
};

export default AccountRoleChecker;
