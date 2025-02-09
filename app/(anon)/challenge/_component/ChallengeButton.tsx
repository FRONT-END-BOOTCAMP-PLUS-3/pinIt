import style from '@/app/(anon)/challenge/_component/ChallengeButton.module.scss';
import Link from 'next/link';

const ChallengeButton = ({
  isFilteringMyPins,
  onChallengeButtonClick,
}: {
  isFilteringMyPins: boolean;
  onChallengeButtonClick: () => Promise<void>;
}) => {
  return isFilteringMyPins ? (
    <button
      type='button'
      className={style.challengeButton}
      onClick={onChallengeButtonClick}
    >
      챌린지 해제하기
    </button>
  ) : (
    <Link href={'/challenge/add'} className={style.challengeButton}>
      <span>챌린지 등록하기</span>
    </Link>
  );
};

export default ChallengeButton;
