import Icon from '../Icon/Icon';
import styles from './RoundIconButton.module.scss';

const RoundIconButton = ({
  iconId,
  onClickIconButton,
}: {
  iconId: string;
  onClickIconButton: React.MouseEventHandler;
}) => {
  return (
    <button type='button' className={styles.btn} onClick={onClickIconButton}>
      <Icon id={iconId} />
    </button>
  );
};

export default RoundIconButton;
