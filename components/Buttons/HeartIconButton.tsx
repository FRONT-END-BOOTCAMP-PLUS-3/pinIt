import Icon from '../Icon/Icon';
import styles from './HeartIconButton.module.scss';

const HeartIconButton = ({
  liked,
  w,
  h,
  onClickLikeButton,
  heartColor = '#fff', // 기본값 설정
}: {
  liked: boolean;
  w: number;
  h: number;
  onClickLikeButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  heartColor?: string; // heartColor는 선택적 속성으로 정의
}) => {
  return (
    <>
      <button
        type='button'
        className={styles.button}
        onClick={onClickLikeButton}
      >
        <Icon
          id={liked ? 'heart-bold' : 'heart'}
          color={liked ? '#FF2F32' : heartColor} // heartColor 사용
          width={w}
          height={h}
        />
      </button>
    </>
  );
};

export default HeartIconButton;
