import style from '@/components/Confirmation/Confirmation.module.scss';
import Button from '../Buttons/Button';
import { MouseEventHandler, useEffect, useRef } from 'react';

const Confirmation = ({
  text,
  opened,
  onClickConfirmation,
  modalClose,
}: {
  text: string;
  opened: boolean;
  onClickConfirmation: MouseEventHandler;
  modalClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!modalRef.current || modalRef.current.contains(e.target as Node))
        return;

      modalClose();
    };

    if (opened) {
      document.addEventListener('click', listener);
    }

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [opened, modalClose]);

  if (!opened) return null;

  return (
    <div
      className={
        opened ? `${style.confirmation} ${style.open}` : style.confirmation
      }
    >
      {opened ? (
        <div className={style.contents} ref={modalRef}>
          <p>{text}</p>
          <div className={style.button_container}>
            <Button label='확인' onClickButton={onClickConfirmation}></Button>
            <Button
              label='취소'
              whiteColor={true}
              onClickButton={modalClose}
            ></Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Confirmation;
