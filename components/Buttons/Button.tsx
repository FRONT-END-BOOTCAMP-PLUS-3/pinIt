import { useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './Button.module.scss';

const Button = ({
  label,
  icon,
  whiteColor = false,
  border = true,
  disabled = false,
  onClickButton,
}: {
  label: string;
  icon?: string;
  whiteColor?: boolean;
  border?: boolean;
  disabled?: boolean;
  onClickButton?: React.MouseEventHandler;
}) => {
  const [iconHover, setIconHover] = useState(false);

  return (
    <button
      type='button'
      className={`${!whiteColor && border ? styles.btn : ''}${whiteColor ? styles.btn_white : ''}${!border ? styles.btn_text_underline : ''}${disabled ? ' '+styles.disabled : ''}`}
      onClick={onClickButton}
      onMouseEnter={() => !disabled && setIconHover(true)}
      onMouseLeave={() => !disabled && setIconHover(false)}
    >
      {icon && <Icon id={icon} width={28} height={28} color={disabled ? 'white' : iconHover ? '#292526' : 'white'} />}<span>{label}</span>
    </button>
  );
};

export default Button;
