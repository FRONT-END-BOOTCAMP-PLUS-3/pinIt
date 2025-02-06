'use client';

import styles from '../ViewMap.module.scss';
import Link from 'next/link';
import ROUTES from '@/constants/routes';
import Image from 'next/image';
import HeartIconButton from '@/components/Buttons/HeartIconButton';

const PinList = ({
  id,
  url = '/default_image.png',
  alt,
  location,
  address,
  description,
  liked,
  onClickLikeButton,
}: {
  id: string;
  url?: string;
  alt: string;
  location: string;
  address: string;
  description: string;
  liked: boolean;
  onClickLikeButton: React.MouseEventHandler;
}) => {
  return (
    <li>
      <Link href={'/'} className={styles.pinItem}>
        <div className={styles.text}>
          <h3>{location}</h3>
          <h4>{address}</h4>
          <p>{description}</p>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={url}
            alt={alt}
            width={80}
            height={80}
          />
          <div className={styles.heart}>
            {liked ? (
              <HeartIconButton
                liked={true}
                w={16}
                h={16}
                onClickLikeButton={onClickLikeButton}
              />
            ) : (
              <HeartIconButton
                liked={false}
                w={16}
                h={16}
                onClickLikeButton={onClickLikeButton}
              />
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PinList;
