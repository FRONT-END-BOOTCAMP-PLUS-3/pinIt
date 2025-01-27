import styles from './Button.module.scss';

const Button = ({
  label,
  whiteColor = false,
  border = true,
  onClickButton,
}: {
  label: string;
  whiteColor?: boolean;
  border?: boolean;
  onClickButton: React.MouseEventHandler;
}) => {
  return (
    <button
      type='button'
      className={`${!whiteColor && border ? styles.btn : ''}${whiteColor ? styles.btn_white : ''}${!border ? styles.btn_text_underline : ''}`}
      onClick={onClickButton}
    >
      {label}
    </button>
  );
};

export default Button;
