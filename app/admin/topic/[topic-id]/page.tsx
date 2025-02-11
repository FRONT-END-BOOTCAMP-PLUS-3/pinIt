'use client';

import Button from '@/components/Buttons/Button';
import styles from './page.module.scss';
import InputBox from '@/components/InputBox/InputBox/InputBox';
import DatePicker from '@/components/InputBox/DatePicker/DatePicker';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChallengeTopic } from '@/domain/entities/ChallengeTopic';
import { showChallengeTopic } from '../../_api/showChallengeTopic';

const TopicView: React.FC = () => {
  // param(challengeTopicId) 받아오기
  const params = useParams();
  const challengeTopicId = params['topic-id'] as string; // Type assertion을 이용해 string으로 변환

  const router = useRouter(); // onClick 또는 onClickEvent를 통한 페이지 이동에 필요

  /* 챌린지 주제 정보 받아오기 시작 */
  const [challengeTopic, setChallengeTopic] = useState<ChallengeTopic | null>(null);
  // fetch 여부를 통해 무한반복 로드 방지(매우 중요)
  const [isFetching, setIsFetching] = useState(false);
  // form값 유효 검사
  const [isFormValid, setIsFormValid] = useState(false);

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
        if (!data) {
          setIsFormValid(false);
          return;
        }
        setChallengeTopic(data);
        setIsFormValid(true);
      } catch (error) {
        console.error('🚨 챌린지 주제 불러오기 실패:', error);
      } finally {
        setIsFetching(false); // fetch 여부를 통해 무한반복 로드 방지(매우 중요)
      }
    };
    fetchData();
  }, [challengeTopicId, isFetching]); // isFetching을 deps에 안 넣으면 isFetching값이 useState 내에서 적용 안됨(→무한반복)
  /* 챌린지 주제 정보 받아오기 끝 */

  /* 날짜 시간 정상적으로 변환 시작 */
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // startDate 변환 (UTC 변환 없이 KST 00:00:01 적용 후 YYYY-MM-DD 반환)
    setStartDate(
      challengeTopic?.startDate
        ? `${new Date(challengeTopic.startDate).getFullYear()}-${String(new Date(challengeTopic.startDate).getMonth() + 1).padStart(2, '0')}-${String(new Date(challengeTopic.startDate).getDate()).padStart(2, '0')}`
        : ''
    );
    // endDate 변환 (UTC 변환 없이 KST 23:59:59 적용 후 YYYY-MM-DD 반환)
    setEndDate(
      challengeTopic?.endDate
        ? `${new Date(challengeTopic.endDate).getFullYear()}-${String(new Date(challengeTopic.endDate).getMonth() + 1).padStart(2, '0')}-${String(new Date(challengeTopic.endDate).getDate()).padStart(2, '0')}`
        : ''
    );
  }, [challengeTopic]);
  /* 날짜 시간 정상적으로 변환 끝 */

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // 폼 데이터 처리 로직 작성
    console.log('Form submitted');
  };

  const handleMove = (): void => {
    // 현재 URL의 pathname에 '/edit'를 추가하여 이동 (Router 이용)
    const currentPath = window.location.pathname;
    router.push(`${currentPath}/edit`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.pageTitle}>챌린지 정보</h2>
      <div className={styles.inputContainer}>
        <h3 className={styles.title}>챌린지 주제 *</h3>
        <div>
          <InputBox value={challengeTopic?.topic} placeholder={isFormValid ? '주제를 입력해 주세요.' : '데이터를 불러올 수 없습니다.'} readOnly={true} />
        </div>
      </div>
      <DatePicker value={startDate} title='시작 날짜 *' placeholder={isFormValid ? "챌린지 시작 날짜를 선택하세요." : "데이터를 불러올 수 없습니다."} readOnly={true} />
      <DatePicker value={endDate} title='종료 날짜 *' placeholder={isFormValid ? "챌린지 종료 날짜를 선택하세요." : "데이터를 불러올 수 없습니다."} readOnly={true} />
      <div className={styles.saveButton}>
        <Button icon='write' label='수정하기' onClickButton={handleMove} disabled={!isFormValid} />
      </div>
    </form>
  );
};

export default TopicView;
