'use client';

import styles from '../ViewMap.module.scss';
import Link from 'next/link';
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
  onClickLikeButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <li>
      <Link href={`/${id}`} className={styles.pinItem}>
        <div className={styles.text}>
          <h3 className={styles.location}>{location}</h3>
          <p className={styles.address}>{address}</p>
          <p className={styles.description}>{description}</p>
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
