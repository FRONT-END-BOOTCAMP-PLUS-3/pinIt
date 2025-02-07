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
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부
  const [list, setList] = useState<PinDto[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const containerRef = useRef<HTMLUListElement>(null);
  const [cardWidth, setCardWidth] = useState(112);
  const gap = 14;

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
    console.log(checkedPinIds);
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
      window.location.reload();
    } catch (error) {
      console.error('🚨 핀 삭제 실패:', error);
      alert('❌ 핀 삭제에 실패했습니다.');
    } finally {
      setDeletePopupOpen(false);
    }
  };

  /* 핀 카드 너비 자동 조정 */
  const calculateCardWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const itemsPerRow = Math.floor((containerWidth + gap) / (112 + gap));
      const totalGaps = (itemsPerRow - 1) * gap;
      const dynamicWidth = (containerWidth - totalGaps) / itemsPerRow;
      setCardWidth(dynamicWidth > 112 ? dynamicWidth : 112);
    }
  };

  useEffect(() => {
    calculateCardWidth();
    window.addEventListener('resize', calculateCardWidth);
    return () => window.removeEventListener('resize', calculateCardWidth);
  }, []);

  /* .container 스타일 설정(휴지통 아이콘 고정에 필요) */
  useEffect(() => {
    const container = document.querySelector('.container');
    if (container) {
      (container as HTMLElement).style.position = 'relative';
    }
  }, []);

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

        <ul
          className={styles.list}
          ref={containerRef}
          style={
            {
              '--checkbox': isEditing ? 'block' : 'none',
              gap: gap,
            } as React.CSSProperties
          }
        >
          {list.length > 0 ? (
            list.map((pin, index) => (
              <li key={pin.id} className={styles.list_item}>
                <ProfilePinCard
                  id={pin.id}
                  url={pin.image}
                  width={cardWidth}
                  location={pin.placeName}
                  address={pin.address}
                  checked={checkedItems[index] || false}
                  onClickCheckButton={() => handleCheck(pin.id)}
                  isEditing={isEditing}
                />
              </li>
            ))
          ) : (
            <li className={styles.nodata}>리스트가 없습니다.</li>
          )}
        </ul>
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
