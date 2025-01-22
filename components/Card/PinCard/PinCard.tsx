import style from '@/components/Card/PinCard/PinCard.module.scss';
import Icon from '@/components/Icon/Icon';
import Image from 'next/image';

const PinCard = ({
  url = '/default.png',
  alt,
  location,
  address,
  clicked,
  onClickLikeButton,
}: {
  url?: string;
  alt: string;
  location: string;
  address: string;
  clicked: boolean;
  onClickLikeButton: React.MouseEventHandler;
}) => {
  return (
    <div className={style.PinCard}>
      <Image
        className={style.image}
        src={url}
        alt={alt}
        width={120}
        height={160}
      />
      <div className={style.PinCard_text}>
        <h2 className={style.location}>{location}</h2>
        <p className={style.address}>{address}</p>
      </div>
      <button
        type='button'
        className={style.likeButton}
        onClick={onClickLikeButton}
      >
        {!clicked ? (
          <Icon id='heart' width={16} height={16}></Icon>
        ) : (
          <Icon id='heart-bold' width={16} height={16}></Icon>
        )}
      </button>
    </div>
  );
};

export default PinCard;
