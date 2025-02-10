'use client';

import HeartIconButton from '@/components/Buttons/HeartIconButton';
import style from '@/components/Card/PinCard/PinCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const PinCard = ({
  id,
  url = '/default_image.png',
  alt,
  location,
  address,
  liked,
  onClickLikeButton,
}: {
  id: string;
  url?: string;
  alt: string;
  location: string;
  address: string;
  liked: boolean;
  onClickLikeButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <Link href={`/${id}`} passHref className={style.PinCard}>
      <div className={style.image_wrapper}>
        <Image
          className={style.image}
          src={url}
          alt={alt}
          fill={true}
          sizes='(max-width: 768px) 33vw'
        />
      </div>
      <div className={style.text}>
        <h2 className={style.location}>{location}</h2>
        <p className={style.address}>{address}</p>
      </div>
      <div className={style.icon}>
        {liked ? (
          <HeartIconButton
            liked={true}
            w={16}
            h={16}
            onClickLikeButton={(e: React.MouseEvent<HTMLButtonElement>) =>
              onClickLikeButton(e)
            }
          />
        ) : (
          <HeartIconButton
            liked={false}
            w={16}
            h={16}
            onClickLikeButton={(e: React.MouseEvent<HTMLButtonElement>) =>
              onClickLikeButton(e)
            }
          />
        )}
      </div>
    </Link>
  );
};

export default PinCard;
