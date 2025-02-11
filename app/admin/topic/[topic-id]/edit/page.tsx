'use client';

import Button from '@/components/Buttons/Button';
import styles from '../page.module.scss';
import InputBox from '@/components/InputBox/InputBox/InputBox';
import DatePicker from '@/components/InputBox/DatePicker/DatePicker';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { updateChallengeTopic } from '@/app/admin/_api/updateChallengeTopic';
import ROUTES from '@/constants/routes';
import Confirmation from '@/components/Confirmation/Confirmation';
import { showChallengeTopic } from '@/app/admin/_api/showChallengeTopic';
import { ChallengeTopic } from '@/domain/entities/ChallengeTopic';

const TopicEdit: React.FC = () => {
  const params = useParams();
  const challengeTopicId = params['topic-id'] as string;

  // Next.js 라우터
  const router = useRouter();
  // 확인 팝업
  const [submitPopupOpen, setSubmitPopupOpen] = useState(false);

  /* 챌린지 주제 정보 받아오기 시작 */
  const [challengeTopic, setChallengeTopic] = useState<ChallengeTopic | null>(null);
  // fetch 여부를 통해 무한반복 로드 방지(매우 중요)
  const [isFetching, setIsFetching] = useState(false);

  useEffect(()=>{
    // ✅ challengeTopicId가 없거나 이미 요청 중이면 실행 안 함 (isFetching 매우 중요)
    if (!challengeTopicId || isFetching) return;

    const fetchData = async () => {
      try {
        if (!challengeTopicId) {
          console.error("🚨 Challenge Topic ID is missing.");
          return;
        }
        const data = await showChallengeTopic(challengeTopicId);
        setChallengeTopic(data);
      } catch (error) {
        console.error('🚨 챌린지 주제 불러오기 실패:', error);
      } finally {
        setIsFetching(false); // fetch 여부를 통해 무한반복 로드 방지(매우 중요)
      }
    };
    fetchData();
  }, [challengeTopicId, isFetching]); // isFetching을 deps에 안 넣으면 isFetching값이 useState 내에서 적용 안됨(→무한반복)
  /* 챌린지 주제 정보 받아오기 끝 */

  /* 아이콘 비활성화 관련 설정 */
  const [topic, setTopic] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // ✅ challengeTopic이 변경될 때 input 값 업데이트
  useEffect(() => {
    if (challengeTopic) {
      // topic값이 없으면 빈 값('') 반환
      setTopic(challengeTopic.topic || '');
      // startDate 변환 (UTC 변환 없이 KST 00:00:01 적용 후 YYYY-MM-DD 반환)
      setStartDate(
        challengeTopic.startDate
          ? `${new Date(challengeTopic.startDate).getFullYear()}-${String(new Date(challengeTopic.startDate).getMonth() + 1).padStart(2, '0')}-${String(new Date(challengeTopic.startDate).getDate()).padStart(2, '0')}`
          : ''
      );
      // endDate 변환 (UTC 변환 없이 KST 23:59:59 적용 후 YYYY-MM-DD 반환)
      setEndDate(
        challengeTopic.endDate
          ? `${new Date(challengeTopic.endDate).getFullYear()}-${String(new Date(challengeTopic.endDate).getMonth() + 1).padStart(2, '0')}-${String(new Date(challengeTopic.endDate).getDate()).padStart(2, '0')}`
          : ''
      );
    }
  }, [challengeTopic]);

  // // 입력값이 전부 비어있지 않으면 폼이 유효하다고 판단
  const isFormValid = topic !== '' && startDate !== '' && endDate !== '';
  /* 아이콘 비활성화 관련 설정 */

  /* 폼 입력 시작 */
  const handleUpdateTopicChallenge = async () => {
    const formData:any = { topic, startDate, endDate };
    await updateChallengeTopic(challengeTopicId, formData);
    router.push(ROUTES.admin.topic.detail.replace("[topic-id]", challengeTopicId));
  }

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setSubmitPopupOpen(true);
  };
  /* 폼 입력 끝 */

  return (
    <>
    {/* submitPopupOpen이 true일 때만 Confirmation 표시 */}
    {submitPopupOpen && (
      <Confirmation
        text='수정하시겠습니까?'
        opened={submitPopupOpen}
        onClickConfirmation={handleUpdateTopicChallenge}
        modalClose={() => setSubmitPopupOpen(false)}
      />
    )}
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.pageTitle}>챌린지 수정</h2>
      <div className={styles.inputContainer}>
        <h3 className={styles.title}>챌린지 주제 *</h3>
        <div>
          <InputBox value={topic} placeholder='주제를 입력해 주세요.' onChange={(e) => setTopic(e.target.value)} />
        </div>
      </div>
      <DatePicker value={startDate} title='시작 날짜 *' placeholder="챌린지 시작 날짜를 선택하세요." onChange={(dateValue) => setStartDate(dateValue)} />
      <DatePicker value={endDate} title='종료 날짜 *' placeholder="챌린지 종료 날짜를 선택하세요." onChange={(dateValue) => setEndDate(dateValue)} />
      <div className={styles.saveButton}>
        <Button icon='download' label='저장하기' onClickButton={handleSubmit} disabled={!isFormValid} />
      </div>
    </form>
    </>
  );
};

export default TopicEdit;
