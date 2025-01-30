'use client';

import Button from '@/components/Buttons/Button';
import styles from '../page.module.scss';
import InputBox from '@/components/InputBox/InputBox/InputBox';
import DatePicker from '@/components/InputBox/DatePicker/DatePicker';

const topicEdit: React.FC = () => {
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
          <InputBox value='눈 내리는 겨울' placeholder='주제를 입력해 주세요.' />
        </div>
      </div>
      <DatePicker value="2025-01-01" title='시작 날짜 *' placeholder="챌린지 시작 날짜를 선택하세요." />
      <DatePicker value="2025-01-15" title='종료 날짜 *' placeholder="챌린지 종료 날짜를 선택하세요." />
      <div className={styles.saveButton}>
        <Button label='저장하기' onClickButton={handleSubmit} />
      </div>
    </form>
  );
};

export default topicEdit;
