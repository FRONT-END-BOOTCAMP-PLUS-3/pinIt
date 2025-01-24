'use client';

import style from '@/app/(anon)/challenge/add/page.module.scss';
import Button from '@/components/Buttons/Button';
import SelectablePinCard from '@/components/Card/SelectablePinCard/SelectablePinCard';

interface SelectableCardData {
  id: string;
  url: string;
  location: string;
  address: string;
  checked: boolean;
}

const ChallengeAdd = () => {
  const data: SelectableCardData[] = [
    {
      id: 'dfeqf',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      checked: false,
    },
    {
      id: 'afad0f1',
      url: '/default_image.png',
      location: '남산타워',
      address: '서울시 용산구',
      checked: true,
    },
  ];

  const handleChallengeAdd = () => {
    console.log('hi');
  };

  return (
    <form className={style.challengeAdd}>
      <h2 className={style.title}>내가 올린 핀</h2>
      <div className={style.card_container}>
        {data?.map((item) => (
          <SelectablePinCard
            key={item.id}
            url={item.url}
            alt={item.location}
            location={item.location}
            address={item.address}
            checked={item.checked}
            onClickCheckButton={() => {
              console.log('클릭');
            }}
          />
        ))}
      </div>
      <Button label='챌린지 등록하기' onClickButton={handleChallengeAdd} />
    </form>
  );
};

export default ChallengeAdd;
