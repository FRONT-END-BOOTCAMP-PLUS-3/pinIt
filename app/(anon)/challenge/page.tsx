'use client';

import style from '@/app/(anon)/challenge/page.module.scss';
import PinCard from '@/components/Card/PinCard/PinCard';
import ComboBox from '@/components/ComboBox/ComboBox';

interface PinCardData {
  id: string;
  url: string;
  location: string;
  address: string;
  clicked: boolean;
}

const Challenge = () => {
  const data: PinCardData[] = [
    {
      id: 'dfeqf',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      clicked: false,
    },
    {
      id: 'afad0f1',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      clicked: true,
    },
    {
      id: '123favb12',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      clicked: false,
    },
    {
      id: '12312dsa',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      clicked: false,
    },
    {
      id: '1231d',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      clicked: false,
    },
    {
      id: 'aef112',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      clicked: true,
    },
    {
      id: '1220dava9',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      clicked: false,
    },
  ];

  return (
    <div className={style.Challenge}>
      <div className={style.title}>
        <ComboBox options={['hi', 'naver']} />
      </div>
      <div className={style.pinCard_container}>
        {data?.map((item) => (
          <PinCard
            key={item.id}
            url={item.url}
            alt={item.location}
            location={item.location}
            address={item.address}
            liked={item.clicked}
            onClickLikeButton={() => {
              console.log('클릭');
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Challenge;
