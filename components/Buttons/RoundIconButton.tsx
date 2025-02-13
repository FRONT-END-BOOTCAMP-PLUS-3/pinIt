import Icon from '../Icon/Icon';
import styles from './RoundIconButton.module.scss';

interface RoundIconButtonProps {
  iconId: string;
  onClickIconButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RoundIconButton: React.FC<RoundIconButtonProps> = ({
  iconId,
  onClickIconButton,
}) => {
  return (
    <button type='button' className={styles.btn} onClick={onClickIconButton}>
      <Icon id={iconId} />
    </button>
  );
};

export default RoundIconButton;
