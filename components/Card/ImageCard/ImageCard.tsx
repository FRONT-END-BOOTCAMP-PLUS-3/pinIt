'use client';

import style from '@/components/Card/ImageCard/ImageCard.module.scss';
import Image from 'next/image';
import ROUTES from '@/constants/routes';
import Link from 'next/link';

const ImageCard = ({
  url = '/default_image.png',
  alt,
  pinId,
}: {
  url?: string;
  alt: string;
  pinId: string;
}) => {
  const pinDetailUrl = ROUTES.pin.detail.replace('[pin-id]', pinId);
  return (
    <Link href={pinDetailUrl} className={style.imageCard}>
      <Image
        className={style.image}
        src={url}
        alt={alt}
        width={112}
        height={160}
        priority
      />
    </Link>
  );
};

export default ImageCard;
