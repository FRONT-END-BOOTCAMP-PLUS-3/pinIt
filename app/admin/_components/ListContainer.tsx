'use client';

import style from '@/app/admin/page.module.scss';

const ListContainer = () => {
  const mockData = [
    {
      id: '1',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '2',
      contents: '남산 타워에서 찍었어요',
      location: '남산타워',
      address: '서울시 용산구',
    },
    {
      id: '3',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '4',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '5',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '3234123fd0',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '6',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '7',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '8',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '9',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '10',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '11',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '12',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '13',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '14',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '15',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '16',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '17',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '18',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '19',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '20',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '21',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '22',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
  ];

  return (
    <div className={style.listContainer_wrapper}>
      <table className={style.listContainer}>
        <thead>
          <tr className={style.listHeader}>
            {Object.keys(mockData[0]).map((item, index) => (
              <th key={index} scope='col'>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => (
            <tr
              key={item.id}
              className={style.listItem}
              onClick={() => {
                console.log('hi');
              }}
            >
              {Object.values(item).map((details, index) => (
                <th key={index}>{details}</th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListContainer;
