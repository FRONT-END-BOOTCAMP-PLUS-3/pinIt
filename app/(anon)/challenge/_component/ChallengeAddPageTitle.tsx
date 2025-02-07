import style from '@/app/(anon)/challenge/_component/ChallengeAddPageTitle.module.scss';
import { ChallengeTopicDto } from '@/application/usecases/challenge/dto/ChallengeTopicDto';
import { useEffect } from 'react';

const ChallengeAddPageTitle = ({
  challengeTopic,
  setchallengeTopic,
}: {
  challengeTopic: ChallengeTopicDto | null;
  setchallengeTopic: (data: ChallengeTopicDto | null) => void;
}) => {
  useEffect(() => {
    async function fetchThisWeekChallengeTopic() {
      const response = await fetch('/api/challenge-topic-list');
      if (!response.ok) {
        console.log('이번 주 챌린지 주제가 없습니다.');
        setchallengeTopic(null);
        return;
      }
      const data = await response.json();
      setchallengeTopic(data.challengeTopics[0]);
    }

    fetchThisWeekChallengeTopic();
  }, [setchallengeTopic]);

  // 현재 진행 중인 챌린지가 있는지 확인
  const isChallengeOngoing = () => {
    const today = new Date().getTime();

    if (!challengeTopic?.startDate || !challengeTopic?.endDate) return false;

    const startTime = new Date(challengeTopic.startDate).getTime();
    const endTime = new Date(challengeTopic.endDate).getTime();

    return startTime <= today && today <= endTime;
  };

  return (
    <h2 className={style.title}>
      <span className={style.ellipsis_box}>
        {!isChallengeOngoing() && <span>지금 진행 중인 챌린지가 없어요.</span>}

        <span>
          {challengeTopic?.topic}{' '}
          {challengeTopic?.startDate && challengeTopic?.endDate && (
            <strong>
              ({new Date(challengeTopic?.startDate).toISOString().split('T')[0]}{' '}
              ~ {new Date(challengeTopic?.endDate).toISOString().split('T')[0]})
            </strong>
          )}
        </span>
      </span>
    </h2>
  );
};

export default ChallengeAddPageTitle;
