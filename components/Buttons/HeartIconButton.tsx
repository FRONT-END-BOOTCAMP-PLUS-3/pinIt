import Icon from '../Icon/Icon';
import styles from './HeartIconButton.module.scss';

// liked는 상태관리
const HeartIconButton = ({
  liked,
  w,
  h,
  onClickLikeButton,
}: {
  liked: boolean;
  w: number;
  h: number;
  onClickLikeButton: React.MouseEventHandler;
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
          color={liked ? '#FF2F32' : '#ffffff'}
          width={w}
          height={h}
        />
      </button>
    </>
  );
};

export default HeartIconButton;
