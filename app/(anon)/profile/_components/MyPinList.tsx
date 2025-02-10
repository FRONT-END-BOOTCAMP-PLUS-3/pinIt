'use client';

import { useEffect, useRef, useState } from 'react';
import { showMyPinList } from '../_api/showMyPinList';
import styles from './MyPinList.module.scss';
import ProfilePinCard from '@/components/Card/ProfilePinCard/ProfilePinCard';
import Icon from '@/components/Icon/Icon';
import Confirmation from '@/components/Confirmation/Confirmation';
import { deletePin } from '../../[pinId]/_api/deletePin';

interface PinDto {
  id: string;
  placeName: string;
  address: string;
  image: string;
}

const MyPinList = ({ userId }: { userId?: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [list, setList] = useState<PinDto[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* .container 스타일 설정(휴지통 아이콘 고정에 필요) */
  useEffect(() => {
    const container = document.querySelector('.container');
    if (container) {
      (container as HTMLElement).style.position = 'relative';
    }
  }, []);

  /* 핀 리스트 불러오기 */
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const data = await showMyPinList(userId);
        setList(data);
        setCheckedItems({});
      } catch (error) {
        console.error('🚨 핀 데이터 불러오기 실패:', error);
      }
    };
    fetchData();
  }, [userId]);

  /* 핀 항목 체크 */
  useEffect(() => {
    const initialCheckedState: Record<string, boolean> = {};
    list.forEach((pin) => {
      initialCheckedState[pin.id] = false;
    });
    setCheckedItems(initialCheckedState);
  }, [list]);

  /* 체크박스 관리 */
  const handleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const checkedPinIds = Object.entries(checkedItems)
    .filter(([_, checked]) => checked)
    .map(([id]) => id);

  /* 삭제 기능 */
  const handleDelete = () => {
    setDeletePopupOpen(true);
    setIsEditing(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await Promise.all(checkedPinIds.map((pinId) => deletePin(pinId)));
      alert(`✅ 선택한 ${checkedPinIds.length}개의 핀이 삭제되었습니다.`);
      // 새로고침(전체 페이지)
      window.location.reload();
    } catch (error) {
      console.error('🚨 핀 삭제 실패:', error);
      alert('❌ 핀 삭제에 실패했습니다.');
    } finally {
      setDeletePopupOpen(false);
    }
  };

  return (
    <>
      {/* 삭제 확인 모달 */}
      {deletePopupOpen && (
        <Confirmation
          text='정말 삭제하시겠습니까?'
          opened={deletePopupOpen}
          onClickConfirmation={handleConfirmDelete}
          modalClose={() => setDeletePopupOpen(false)}
        />
      )}

      <div className={styles.mypin_list}>
        <div className={styles.head}>
          <h1 className={styles.title}>내가 올린 핀</h1>

          {/* 편집/완료 버튼 */}
          <button
            className={`${styles.button} ${isEditing ? styles.complete : ''}`}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? '취소' : '편집'}
          </button>
        </div>

        {/* ✅ 기존의 ul > li 구조를 div.pincard_container 내부에 배치 */}
        <div className={styles.pincard_container} ref={containerRef}>
          {list.length > 0 ? (
            list.map((pin) => (
              <ProfilePinCard
                key={pin.id} // ✅ key를 여기서 사용
                id={pin.id}
                url={pin.image}
                location={pin.placeName}
                address={pin.address}
                checked={checkedItems[pin.id] || false}
                onClickCheckButton={() => handleCheck(pin.id)}
                isEditing={isEditing}
              />
            ))
          ) : (
            <p className={styles.nodata}>리스트가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 삭제 버튼 */}
      <div
        className={`${styles.mypin_delete} ${isEditing && checkedCount > 0 ? styles.visible : styles.hidden}`}
      >
        <button className={styles.delete} onClick={handleDelete}>
          <Icon id={'trash'} />
        </button>
      </div>
    </>
  );
};

export default MyPinList;
