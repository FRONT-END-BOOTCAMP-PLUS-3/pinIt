'use client';

import LikeList from './_components/LikeList';
import NoLike from './_components/NoLike';
import { useEffect, useState } from 'react';
import { LikeListDto } from '@/application/usecases/like/dto/LikeListDto';
import { showLikePinList } from './_api/showLikePinList';

const Like = () => {
  const [pinData, setPinData] = useState<LikeListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showLikePinList();

        setPinData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('🚨 핀 데이터 불러오기 실패:', error);
      } finally {
        setIsLoading(false); // 에러가 나도 로딩 종료
      }
    };
    fetchData();
  }, []);

  if (isLoading) return null;

  return (
    <>
      {pinData.length > 0 ? (
        <LikeList pinData={pinData} setPinData={setPinData} />
      ) : (
        <NoLike />
      )}
    </>
  );
};

export default Like;
