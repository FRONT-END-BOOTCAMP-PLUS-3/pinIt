import styles from '../searchPage.module.scss';
import PinCard from '@/components/Card/PinCard/PinCard';

const data = [
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
];

const LocationTab: React.FC = () => {
  return (
    <div className={styles.locationTabContainer}>
      <div className={styles.pinCard_container}>
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

export default LocationTab;
