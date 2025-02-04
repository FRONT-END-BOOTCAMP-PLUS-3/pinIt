'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './pinDetail.module.scss';
import ProfileSection from './_components/ProfileSection';
import PinImageSection from './_components/PinImageSection';
import TitleSection from './_components/TitleSection';
import AddressSection from './_components/AddressSection';
import MapSection from './_components/MapSection';
import { pinDetail } from './_api/pinDetail';

const PinDetailPage: React.FC = () => {
  const params = useParams();
  const pinId = params?.pinId as string;

  const [pinImage, setPinImage] = useState<string>('/logo_main.png');
  const [profile, setProfile] = useState({
    nickname: '',
    userId: '',
    profileImg: '/default-profile-img.jpg',
    isLiked: false,
    countLike: 0,
  });
  const [title, setTitle] = useState({
    placeName: '',
    captureDate: '',
    description: '',
    tags: [] as string[],
    hasPermission: false,
  });
  const [address, setAddress] = useState('');
  const [map, setMap] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // URL에서 pinId 가져오기
        if (!pinId) return;

        // API 호출
        const data = await pinDetail(pinId);

        // 상태 업데이트
        setPinImage(data.image);
        setProfile({
          nickname: data.nickname,
          userId: data.userId,
          profileImg: data.profileImg,
          isLiked: data.isLiked,
          countLike: data.countLike,
        });
        setTitle({
          placeName: data.placeName,
          captureDate: new Date(data.captureDate).toISOString(),
          description: data.description,
          tags: data.tags,
          hasPermission: data.hasPermission,
        });
        setAddress(data.address);
        setMap({ latitude: data.latitude, longitude: data.longitude });
      } catch (error) {
        console.error('🚨 핀 상세정보 데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [pinId]); // 의존성 배열 추가
  return (
    <div className={styles.pinDetailContainer}>
      <PinImageSection pinImage={pinImage} />
      <ProfileSection profile={profile} />
      <TitleSection title={title} />
      <AddressSection address={address} />
      <MapSection map={map} />
    </div>
  );
};

export default PinDetailPage;
