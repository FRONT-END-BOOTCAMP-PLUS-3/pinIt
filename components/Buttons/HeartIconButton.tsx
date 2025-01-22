import Icon from '../Icon/Icon';
import styles from './HeartIconButton.module.scss';

const liked = true; // liked는 좋아요 눌렀는지 받아오는 것

const HeartIconButton = () => {
  return (
    <>
      {/* onClick={handleClick} 나중에 추가 */}
      <button className={styles.button}>
        <Icon
          id={liked ? 'heart-bold' : 'heart'}
          color={liked ? '#FF2F32' : 'none'}
        />
      </button>
    </>
  );
};

export default HeartIconButton;
