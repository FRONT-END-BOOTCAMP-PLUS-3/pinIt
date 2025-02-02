'use client';

import styles from '../ViewMap.module.scss';
import Link from 'next/link';
import ROUTES from '@/constants/routes';
import Image from 'next/image';

const PinList = ({
  item,
}: {
  item: {
    title: string;
    location: string;
    description: string;
    imageUrl: string;
  };
}) => {
  return (
    <li>
      <Link href={'/'} className={styles.pinItem}>
        <div className={styles.text}>
          <h3>{item.title}</h3>
          <h4>{item.location}</h4>
          <p>{item.description}</p>
        </div>
        {/* <img src={item.imageUrl} className={styles.image} /> */}
        <Image
          className={styles.image}
          src={item.imageUrl}
          alt={item.title}
          width={80}
          height={80}
        />
      </Link>
    </li>
  );
};

export default PinList;
