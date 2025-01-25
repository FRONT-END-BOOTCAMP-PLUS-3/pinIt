'use client';

import styles from '@/components/Card/MyPinCard/MyPinCard.module.scss';
import Icon from '@/components/Icon/Icon';
import Image from 'next/image';

const MyPinCard = ({
  url = '/default_image.png',
  alt,
  location,
  address,
  checked,
  onClickCheckButton,
}: {
  url?: string;
  alt: string;
  location: string;
  address: string;
  checked: boolean;
  onClickCheckButton: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const handleImgClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    // 체크박스와 동일한 동작 수행
    onClickCheckButton({
      target: { checked: !checked },
      currentTarget: { checked: !checked }, // 가짜 이벤트 생성
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div
      className={
        !checked
          ? styles.MyPinCard
          : `${styles.MyPinCard} ${styles.Selected}`
      }
    >
      <div className={styles.image_wrapper} onClick={handleImgClick} onTouchEnd={handleImgClick}>
        <Image
          className={styles.image}
          src={url}
          alt={alt}
          width={120}
          height={160}
        />
      </div>
      <div className={styles.PinCard_text}>
        <h2 className={styles.location}>{location}</h2>
        <p className={styles.address}>{address}</p>
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

export default MyPinCard;
