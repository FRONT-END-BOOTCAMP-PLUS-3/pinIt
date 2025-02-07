'use client';

import styles from '@/components/Card/ProfilePinCard/ProfilePinCard.module.scss';
import Icon from '@/components/Icon/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProfilePinCard = ({
  id,
  url = '/default_image.png',
  width = 120,
  location,
  address,
  checked = false,
  onClickCheckButton,
  isEditing = false,
}: {
  id?: string;
  url?: string;
  width?: number;
  location: string;
  address: string;
  checked?: boolean;
  onClickCheckButton?: React.ChangeEventHandler<HTMLInputElement>;
  isEditing?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  // ✅ isEditing이 변경될 때마다 checked 상태를 false로 초기화
  useEffect(() => {
    setIsChecked(false);
  }, [isEditing]);

  const widthStyle =
    typeof width === 'number' && width > 100
      ? `${width}px`
      : `${width.toFixed(10)}vw`;

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isEditing) return; // ✅ 편집 모드가 아닐 때 클릭 이벤트 무시

    e.stopPropagation(); // 부모 요소로 이벤트 전파 방지
    setIsChecked((prev) => !prev); // ✅ 클릭 시 체크박스 토글

    if (onClickCheckButton) {
      onClickCheckButton({
        target: { checked: !isChecked },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div
      className={`${styles.MyPinCard} ${isEditing && isChecked ? styles.Selected : ''}`}
      style={{ '--card-width': widthStyle } as React.CSSProperties}
      onClick={handleCardClick} // ✅ 편집 모드일 때만 클릭 이벤트 활성화
    >
      {/* ✅ 편집 모드가 아닐 때: 핀 클릭 시 상세보기 이동 */}
      {!isEditing ? (
        <Link href={`/${id}`} className={styles.linkWrapper}>
          <div className={styles.image_wrapper}>
            <Image
              className={styles.image}
              src={url}
              alt={`${address}에서 촬영한 ${location}`}
              width={120}
              height={160}
            />
          </div>
          <div className={styles.PinCard_text}>
            <h2 className={styles.location}>{location}</h2>
            <p className={styles.address}>{address}</p>
          </div>
        </Link>
      ) : (
        /* ✅ 편집 모드일 때도 장소명과 주소 표시 */
        <>
          <div className={styles.image_wrapper}>
            <Image
              className={styles.image}
              src={url}
              alt={`${address}에서 촬영한 ${location}`}
              width={120}
              height={160}
            />
          </div>
          <div className={styles.PinCard_text}>
            <h2 className={styles.location}>{location}</h2>
            <p className={styles.address}>{address}</p>
          </div>
        </>
      )}

      {/* ✅ 편집 모드일 때만 체크박스 표시 */}
      {isEditing && (
        <label
          className={styles.checkButton}
          onClick={(e) => e.stopPropagation()}
        >
          <input type='checkbox' checked={isChecked} readOnly />
          {!isChecked ? (
            <Icon id='check' width={16} height={16} />
          ) : (
            <Icon id='check-bold' color='2f88ff' width={16} height={16} />
          )}
        </label>
      )}
    </div>
  );
};

export default ProfilePinCard;
