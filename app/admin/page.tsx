'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import MenuBar from './_components/MenuBar';
import PinListContainer from './_components/PinListContainer';
import ChallengePinContainer from './_components/ChallengePinContainer';
import ChallengeTopicContainer from './_components/ChallengeTopicContainer';
import UserListContainer from './_components/UserListContainer';
import { JSX } from 'react';
import ComboBoxOptionSelect from './_components/ComboBoxOptionSelect';

interface ComboBoxOption {
  optionName: string;
  optionComponent?: JSX.Element;
}

const options: ComboBoxOption[] = [
  { optionName: '전체 게시글', optionComponent: <PinListContainer /> },
  { optionName: '챌린지에 등록된 핀', optionComponent: <ChallengePinContainer /> },
  { optionName: '챌린지 주제', optionComponent: <ChallengeTopicContainer /> },
  { optionName: '유저 목록', optionComponent: <UserListContainer /> },
];

export default function Admin() {
  /* ComboBox 옵션 설정 시작 */

  // 선택했던 옵션을 저장하기 위한 고유한 키 이름
  const OPTION_KEY = 'adminMainOptionIndex';
  // 다른 페이지로 이동 후 되돌아오거나, admin 페이지를 다시 접속할 때 선택했던 ComboBox 옵션 기억
  // (onSelect={handleOptionSelect}로 사용)
  const { selectedOption, handleOptionSelect } = ComboBoxOptionSelect(options, OPTION_KEY);

  /* ComboBox 옵션 설정 끝 */

  return (
    <div className={style.Admin}>
      <div className={style.navigation}>
        <ComboBox options={options} onSelect={handleOptionSelect} localStorageKey={OPTION_KEY} />
        <MenuBar />
      </div>
      {selectedOption.optionComponent}
    </div>
  );
}
