'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import MenuBar from './_components/MenuBar';
import PinListContainer from './_components/PinListContainer';
import ChallengePinContainer from './_components/ChallengePinContainer';
import ChallengeTopicContainer from './_components/ChallengeTopicContainer';
import UserListContainer from './_components/UserListContainer';
import { JSX, useState } from 'react';

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
  const [selectedOption, setSelectedOption] = useState<ComboBoxOption>(options[0]);

  return (
    <div className={style.Admin}>
      <div className={style.navigation}>
        <ComboBox options={options} onSelect={setSelectedOption} />
        <MenuBar />
      </div>
      {selectedOption.optionComponent}
    </div>
  );
}
