import Icon from '../Icon/Icon';
import styles from './RoundIconButton.module.scss';

const RoundIconButton = ({ onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      <Icon id='trash' />
    </button>
  );
};

export default RoundIconButton;
