import Icon from '../Icon/Icon';
import styles from './RoundIconButton.module.scss';

const RoundIconButton = ({ iconId }: { iconId: string }) => {
  return (
    <button type='button' className={styles.btn}>
      <Icon id={iconId} />
    </button>
  );
};

export default RoundIconButton;
