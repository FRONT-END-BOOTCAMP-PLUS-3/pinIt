import style from '@/app/(anon)/challenge/_component/ChallengeButton.module.scss';
import Confirmation from '@/components/Confirmation/Confirmation';
import Link from 'next/link';
import { useState } from 'react';

const ChallengeButton = ({
  isFilteringMyPins,
  onChallengeButtonClick,
}: {
  isFilteringMyPins: boolean;
  onChallengeButtonClick: () => Promise<void>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmation = async () => {
    setIsModalOpen(false);
    await onChallengeButtonClick();
  };

  return isFilteringMyPins ? (
    <>
      <button
        type='button'
        className={style.challengeButton}
        onClick={() => setIsModalOpen(true)}
      >
        챌린지 해제하기
      </button>

      <Confirmation
        text='챌린지에서 제외 하시겠습니까?'
        opened={isModalOpen}
        onClickConfirmation={handleConfirmation}
        modalClose={() => setIsModalOpen(false)}
      />
    </>
  ) : (
    <Link href={'/challenge/add'} className={style.challengeButton}>
      <span>챌린지 등록하기</span>
    </Link>
  );
};

export default ChallengeButton;
