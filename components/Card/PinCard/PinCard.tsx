import HeartIconButton from '@/components/Buttons/HeartIconButton';
import style from '@/components/Card/PinCard/PinCard.module.scss';
import Image from 'next/image';

const PinCard = ({
  url = '/default_image.png',
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
        {clicked ? (
          <HeartIconButton liked={true} onClickLikeButton={() => {}} />
        ) : (
          <HeartIconButton liked={false} onClickLikeButton={() => {}} />
        )}
      </button>
    </div>
  );
};

export default PinCard;
