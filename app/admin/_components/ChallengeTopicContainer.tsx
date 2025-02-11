'use client';

import { useEffect, useState } from 'react';
import ListComponent from './ListComponent';
import ROUTES from '@/constants/routes';
import { PinListContainerProps } from './PinListContainerProps';
import Link from 'next/link';
import style from '@/app/admin/page.module.scss';
import Button from '@/components/Buttons/Button';
import { challengeTopicList } from '../_api/challengeTopicList';

// 이건 데이터 내용대로 바꾸세요
interface ChallengeTopicData {
  id: string;
  topic: string; // 주제 제목
  createAt: Date; // 생성 날짜
  startDate: Date; // 시작 날짜
  endDate: Date; // 종료 날짜
  adminId: string | null; // 사용자 UUID (외래 키, Foreign Key)
}

const ChallengeTopicContainer = ({
  searchKeyword,
  sortOption, // nickname을 정렬할 기준(기본값은 최신순 정렬)
  trashClicked,
}: PinListContainerProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [data, setData] = useState<ChallengeTopicData[]>([]); // API로 받아온 핀 목록
  const [filteredData, setFilteredData] = useState<ChallengeTopicData[]>([]); // 검색된 데이터 저장

  // fetch 여부를 통해 무한반복 로드 방지(매우 중요)
  const [isFetching, setIsFetching] = useState(false);

  const fetchChallengeTopics = async () => {
    try {
      const fetchedData = await challengeTopicList();
      const validData = fetchedData.filter((challengeTopic) => challengeTopic.id !== null);
      setData(validData);
      setFilteredData(validData);
    } catch (error) {
      console.error('챌린지 주제 데이터를 불러오는 중 오류 발생', error);
    } finally {
      setIsFetching(false); // fetch 여부를 통해 무한반복 로드 방지(매우 중요)
    }
  }

  useEffect(() => {
    if (isFetching) return; // isFetching이 true면 실행 안 함 (매우 중요)
    fetchChallengeTopics(); // 컴포넌트 마운트 시 데이터 불러오기
  }, [isFetching]);

  // searchKeyword에 따라 데이터 필터링
  useEffect(() => {
    if (!searchKeyword || searchKeyword.trim() === '') {
      setFilteredData(data); // 검색어가 없으면 전체 데이터 반환
    } else {
      const lowerSearch = searchKeyword.toLowerCase();
      const filtered = data.filter(
        (challengeTopic) =>
          challengeTopic.id?.toLowerCase().includes(lowerSearch) ||
          challengeTopic.topic.toLowerCase().includes(lowerSearch) ||
          new Date(challengeTopic.createAt).toDateString().toLowerCase().includes(lowerSearch) ||
          new Date(challengeTopic.startDate).toDateString().toLowerCase().includes(lowerSearch) ||
          new Date(challengeTopic.endDate).toDateString().toLowerCase().includes(lowerSearch) ||
          challengeTopic.adminId?.toLowerCase().includes(lowerSearch),
      );
      setFilteredData(filtered);
    }
  }, [searchKeyword, data]);

  // trashClicked이벤트가 발생되면 alert 띄우기
  useEffect(() => {
    if (trashClicked && checkedItems.length > 0) {
      setCheckedItems([]);
      alert('❌ 챌린지 주제 삭제는 불가합니다.');
    }
  }, [trashClicked, checkedItems]);

  return (
    <div className={style.topicContainer}>
      <ListComponent
        data={filteredData}
        setCheckedItems={setCheckedItems}
        checkedItems={checkedItems}
        routePath={ROUTES.admin.topic.detail}
        sortOption={sortOption}
        sortKey='topic'
      />
      <Link href={ROUTES.admin.topic.create} passHref>
        <Button icon='create' label='새 주제 추가' />
      </Link>
    </div>
  );
};

export default ChallengeTopicContainer;
