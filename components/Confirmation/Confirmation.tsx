import style from '@/components/Confirmation/Confirmation.module.scss';

const Confirmation = ({ text }: { text: string }) => {
  return (
    <div className={style.confirmation}>
      <div className={style.confirmation_contents}>
        <div>{text}</div>
        <div className={style.button_container}>
          <button type='button'>확인</button>
          <button type='button'>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
