'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon/Icon';
import styles from '../pinDetail.module.scss';
import Confirmation from '@/components/Confirmation/Confirmation';
import { deletePin } from '../_api/deletePin';

interface TitleProps {
  placeName: string;
  captureDate: string;
  description: string;
  tags: string[];
  hasPermission: boolean;
  pinId: string;
}

const TitleSection: React.FC<{ title: TitleProps }> = ({ title }) => {
  const formattedDate = title.captureDate.split('T')[0]; // YYYY-MM-DD 형식으로 변환
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const router = useRouter(); // Next.js 라우터

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // 삭제 확인 모달 열기
  const handleDelete = () => {
    setDeletePopupOpen(true);
  };

  // 삭제 실행
  const handleConfirmDelete = async () => {
    try {
      await deletePin(title.pinId);
      alert('✅ 핀이 성공적으로 삭제되었습니다.');
      router.push('/'); // 삭제 성공 시 홈으로 이동
    } catch (error) {
      console.error('🚨 핀 삭제 실패:', error);
      alert('❌ 핀 삭제에 실패했습니다.');
    } finally {
      setDeletePopupOpen(false);
    }
  };

  return (
    <div className={styles.titleSection}>
      {/* deletePopupOpen이 true일 때만 Confirmation 표시 */}
      {deletePopupOpen && (
        <Confirmation
          text='정말 삭제하시겠습니까?'
          opened={deletePopupOpen}
          onClickConfirmation={handleConfirmDelete}
          modalClose={() => setDeletePopupOpen(false)}
        />
      )}

      <div className={styles.titleContainer}>
        <h2 className={styles.pinTitle}>「{title.placeName}」</h2>
        {title.hasPermission && (
          <div className={styles.menuWrapper}>
            <span className={styles.menu} onClick={toggleMenu}>
              <Icon id='more' color='#292526' />
            </span>
            {isMenuOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.menuItem}>
                  <Icon id='write' width={20} color='#292526' /> 편집
                </button>
                <button className={styles.menuItem} onClick={handleDelete}>
                  <Icon id='trash' width={20} color='#292526' /> 삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <p className={styles.pinDate}>📸 {formattedDate}</p>
      <p className={styles.pinContent}>{title.description}</p>
      <div className={styles.tags}>
        {title.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TitleSection;
