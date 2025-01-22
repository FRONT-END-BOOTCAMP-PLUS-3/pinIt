'use client'; // React Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter 훅 사용
import styles from '../WhiteHeader.module.scss'; // SCSS 파일 불러오기
import useScrollVisibility from '@/hooks/useScrollVisibility'; // 커스텀 훅 불러오기
import Icon from '@/components/Icon/Icon';

const WhiteHeaderWithBackAndMore = () => {
  const isVisible = useScrollVisibility(); // 스크롤 가시성 상태 가져오기
  const router = useRouter(); // Next.js 라우터 훅 가져오기
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev); // 드롭다운 표시/숨기기 토글
  };

  return (
    <header className={`${styles.header} ${!isVisible ? styles.hidden : ''}`}>
      <div
        className={`${styles.icon} ${styles.iconLeft}`}
        onClick={handleBack}
        role='button'
        tabIndex={0}
      >
        <Icon id='left-black' />
      </div>
      <div
        className={`${styles.icon} ${styles.iconRight}`}
        onClick={toggleDropdown}
        role='button'
        tabIndex={0}
      >
        <Icon id='more-black' />
      </div>
      {dropdownVisible && (
        <div className={styles.dropdown}>
          <button onClick={() => console.log('Edit clicked')}>편집하기</button>
          <button
            className={styles.delete}
            onClick={() => console.log('Delete clicked')}
          >
            삭제하기
          </button>
        </div>
      )}
    </header>
  );
};

export default WhiteHeaderWithBackAndMore;
