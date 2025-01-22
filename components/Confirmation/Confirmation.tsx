import style from '@/components/Confirmation/Confirmation.module.scss';
import Button from '../Buttons/Button';
import { MouseEventHandler } from 'react';

const Confirmation = ({
  text,
  opened,
  ref,
  onClickConfirmation,
  modalClose,
}: {
  text: string;
  opened: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
  onClickConfirmation: MouseEventHandler;
  modalClose: MouseEventHandler;
}) => {
  return (
    <div
      className={
        opened ? `${style.confirmation} ${style.open}` : style.confirmation
      }
    >
      {opened ? (
        <div className={style.contents} ref={ref}>
          <p>{text}</p>
          <div className={style.button_container}>
            <Button label='확인' onClickButton={onClickConfirmation}></Button>
            <Button label='취소' onClickButton={modalClose}></Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Confirmation;
