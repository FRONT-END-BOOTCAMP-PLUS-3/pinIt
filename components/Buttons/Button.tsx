import styles from './Button.module.scss';

const Button = ({
  label,
  whiteColor = false,
  onClickButton,
}: {
  label: string;
  whiteColor?: boolean;
  onClickButton: React.MouseEventHandler;
}) => {
  return (
    <button
      type='button'
      className={whiteColor ? styles.btn_white : styles.btn}
      onClick={onClickButton}
    >
      {label}
    </button>
  );
};

export default Button;
