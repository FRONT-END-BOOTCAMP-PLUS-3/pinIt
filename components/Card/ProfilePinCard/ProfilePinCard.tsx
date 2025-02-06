'use client';

import styles from '@/components/Card/ProfilePinCard/ProfilePinCard.module.scss';
import Icon from '@/components/Icon/Icon';
import Image from 'next/image';
import Link from 'next/link';

const ProfilePinCard = ({
  id,
  url = '/default_image.png',
  width = 120,
  location,
  address,
  checked,
  onClickCheckButton,
}: {
  id?: string;
  url?: string;
  width?: number;
  location: string;
  address: string;
  checked?: boolean;
  onClickCheckButton?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const handleImgClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (onClickCheckButton) {
      e.stopPropagation();
      e.preventDefault();
      // 체크박스와 동일한 동작 수행
      onClickCheckButton({
        target: { checked: !checked },
        currentTarget: { checked: !checked }, // 가짜 이벤트 생성
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  const widthStyle = typeof width === 'number' && width > 100 ? `${width}px` : `${width.toFixed(10)}vw`; // px 또는 vw 처리

  return (
    <div
      className={
        !checked
          ? styles.MyPinCard
          : `${styles.MyPinCard} ${styles.Selected}`
      }
      style={{'--card-width': widthStyle} as React.CSSProperties}
    >
      {onClickCheckButton && (
        <div className={styles.image_wrapper} onClick={handleImgClick} onTouchEnd={handleImgClick}>
          <Image
            className={styles.image}
            src={url}
            alt={address+"에서 촬영한 "+location}
            width={120}
            height={160}
          />
        </div>
      )}
      {!onClickCheckButton && (
        <div className={styles.image_wrapper}>
          <Link href={`/${id}`}>
            <Image
              className={styles.image}
              src={url}
              alt={address+"에서 촬영한 "+location}
              width={120}
              height={160}
            />
          </Link>
        </div>
      )}
      <div className={styles.PinCard_text}>
        <Link href={`/${id}/`}><h2 className={styles.location}>{location}</h2></Link>
        <Link href={`/map`}><p className={styles.address}>{address}</p></Link>
      </div>
      <label className={styles.checkButton} onClick={(e) => {e.stopPropagation(); e.preventDefault()}}>
        <input
          type='checkbox'
          checked={checked}
          onChange={onClickCheckButton}
        />
        {!checked ? (
          <Icon id='check' width={16} height={16} />
        ) : (
          <Icon id='check-bold' color='2f88ff' width={16} height={16} />
        )}
      </label>
    </div>
  );
};

export default ProfilePinCard;
