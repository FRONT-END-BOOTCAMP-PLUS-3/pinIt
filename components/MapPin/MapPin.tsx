'use client';

import styles from './MapPin.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const MapPin = ({
  id,
  placeName,
  imgUrl,
}: {
  id: string;
  placeName: string;
  imgUrl: string;
}) => {
  return (
    <>
      <Link href={`/${id}`} className={styles.pinItem}>
        {' '}
        /
        <div className={styles.marker_area}>
          <div className={styles.marker_image_wrap}>
            <div className={styles.marker_image}>
              <Image src={imgUrl} alt={placeName} width={30} height={30} />
            </div>
          </div>
        </div>
      </Link>
      {/* {showMapListCard && (
            <span>{placeName}</span>
        )} */}
      {/* showMapListCard - MapListCard 컴포넌트를 보여줄지 사라지게할지 결정하는 true/false 결정값
        <span>{placeName}</span> - placeName이 잘 나오는지 테스트용으로 입력, 차후 placeName의 값과 같은 핀들이 MapListCard 컴포넌트에 표시됨 */}
    </>
  );
};

export default MapPin;
