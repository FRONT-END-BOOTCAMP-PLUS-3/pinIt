'use client';

import Button from '@/components/Buttons/Button';
import styles from '../page.module.scss';
import InputBox from '@/components/InputBox/InputBox/InputBox';
import DatePicker from '@/components/InputBox/DatePicker/DatePicker';
import { useState } from 'react';

const TopicEdit: React.FC = () => {
  /* 아이콘 비활성화 관련 설정 */
  const [topic, setTopic] = useState('눈 내리는 겨울');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-01-15');

  // 입력값이 전부 비어있지 않으면 폼이 유효하다고 판단
  const isFormValid = topic !== '' && startDate !== '' && endDate !== '';
  /* 아이콘 비활성화 관련 설정 */

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // 폼 데이터 처리 로직 작성
    console.log('Form submitted');
  };

  return (
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
  );
};

export default TopicEdit;
