import styles from './Button.module.scss';

const Button = ({
  label,
  onClickButton,
}: {
  label: string;
  onClickButton: React.MouseEventHandler;
}) => {
  return (
    <button type='button' className={styles.btn} onClick={onClickButton}>
      {label}
    </button>
  );
};

export default Button;
