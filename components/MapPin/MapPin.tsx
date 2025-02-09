'use client';

import React, { useState } from 'react';
import styles from './MapPin.module.scss';
import Image from 'next/image';

const MapPin = ({
  placeName,
  imgUrl,
}: {
  placeName: string;
  imgUrl: string;
}) => {
  const [showMapListCard, setShowMapListCard] = useState(false);

  const handleShowMapListCard = () => {
    setShowMapListCard((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.marker_area} onClick={handleShowMapListCard}>
        <div className={styles.marker_image_wrap}>
          <div className={styles.marker_image}>
            <Image src={imgUrl} alt={placeName} width={40} height={40} />
          </div>
        </div>
      </div>
      {/* {showMapListCard && (
            <span>{placeName}</span>
        )} */}
      {/* showMapListCard - MapListCard 컴포넌트를 보여줄지 사라지게할지 결정하는 true/false 결정값
        <span>{placeName}</span> - placeName이 잘 나오는지 테스트용으로 입력, 차후 placeName의 값과 같은 핀들이 MapListCard 컴포넌트에 표시됨 */}
    </>
  );
};

export default MapPin;
