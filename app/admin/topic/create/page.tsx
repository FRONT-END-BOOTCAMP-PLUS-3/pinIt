'use client';

import Button from '@/components/Buttons/Button';
import styles from './page.module.scss';
import InputBox from '@/components/InputBox/InputBox/InputBox';
import DatePicker from '@/components/InputBox/DatePicker/DatePicker';
import { useState } from 'react';
import { createChallengeTopic } from '../../_api/createChallengeTopic';
import Confirmation from '@/components/Confirmation/Confirmation';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

const CreateTopic: React.FC = () => {
  // Next.js 라우터
  const router = useRouter();
  // 확인 팝업
  const [submitPopupOpen, setSubmitPopupOpen] = useState(false);

  /* 아이콘 비활성화 관련 설정 시작 */
  const [topic, setTopic] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 입력값이 전부 비어있지 않았을 때 폼이 유효하다고 판단
  const isFormValid = topic !== '' && startDate !== '' && endDate !== '';
  /* 아이콘 비활성화 관련 설정 끝 */

  /* 폼 입력 시작 */
  const handleCreateTopicChallenge = async () => {
    const formData:any = { topic, startDate, endDate }
    await createChallengeTopic(formData);
    alert('✅ 챌린지 주제가 성공적으로 생성되었습니다.');
    router.push(ROUTES.admin.nav);
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
        text='챌린지 주제를 생성하시겠습니까?'
        opened={submitPopupOpen}
        onClickConfirmation={handleCreateTopicChallenge}
        modalClose={() => setSubmitPopupOpen(false)}
      />
    )}
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.pageTitle}>새로운 챌린지 주제 생성</h2>
      <div className={styles.inputContainer}>
        <h3 className={styles.title}>챌린지 주제 *</h3>
        <div>
          <InputBox placeholder='주제를 입력해 주세요.' value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
      </div>
      <DatePicker
        title='시작 날짜 *'
        placeholder="챌린지 시작 날짜를 선택하세요."
        onChange={(dateValue) => setStartDate(dateValue)} />
      <DatePicker
        title='종료 날짜 *'
        placeholder="챌린지 종료 날짜를 선택하세요."
        onChange={(dateValue) => setEndDate(dateValue)} />
      <div className={styles.saveButton}>
        <Button icon='create' label='생성하기' onClickButton={handleSubmit} disabled={!isFormValid} />
      </div>
    </form>
    </>
  );
};

export default CreateTopic;
