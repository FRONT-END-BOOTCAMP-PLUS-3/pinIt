import style from '@/components/Card/SelectablePinCard/SelectablePinCard.module.scss';
import Icon from '@/components/Icon/Icon';
import Image from 'next/image';

const SelectablePinCard = ({
  url = '/default.png',
  alt,
  location,
  address,
  checked,
  onClickCheckButton,
}: {
  url?: string;
  alt: string;
  location: string;
  address: string;
  checked: boolean;
  onClickCheckButton: React.ChangeEventHandler;
}) => {
  return (
    // <div className={!checked ? style.SelectablePinCard : style.Selected}>
    <div
      className={
        !checked
          ? style.SelectablePinCard
          : `${style.SelectablePinCard} ${style.Selected}`
      }
    >
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
      <label className={style.checkButton}>
        <input
          type='checkbox'
          checked={checked}
          onChange={onClickCheckButton}
        />
        {!checked ? (
          <Icon id='check' width={16} height={16} />
        ) : (
          <Icon id='check-bold' color='2f88ff' width={16} height={16} />
        )}
      </label>
    </div>
  );
};

export default SelectablePinCard;
