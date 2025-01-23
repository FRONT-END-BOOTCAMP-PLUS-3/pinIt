'use client';

import style from '@/components/Card/MapListCard/MapListCard.module.scss';
import Image from 'next/image';

const MapListCard = ({
  url,
  alt,
  location,
  address,
  contents,
}: {
  url: string;
  alt: string;
  location: string;
  address: string;
  contents: string;
}) => {
  return (
    <div className={style.MapListCard}>
      <div className={style.text}>
        <div className={style.location_container}>
          <h2 className={style.location}>{location}</h2>
          <p className={style.address}>{address}</p>
        </div>
        <p className={style.contents}>{contents}</p>
      </div>
      <Image
        className={style.image}
        src={url}
        alt={alt}
        width={80}
        height={80}
      />
    </div>
  );
};

export default MapListCard;
