import style from '@/components/Card/ImageCard/ImageCard.module.scss';
import Image from 'next/image';

const ImageCard = ({
  url = '/default_image.png',
  alt,
}: {
  url?: string;
  alt: string;
}) => {
  return (
    <div className={style.imageCard}>
      <Image
        className={style.image}
        src={url}
        alt={alt}
        width={112}
        height={160}
      />
    </div>
  );
};

export default ImageCard;
