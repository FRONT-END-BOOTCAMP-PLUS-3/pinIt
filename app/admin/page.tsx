'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import MenuBar from './_components/MenuBar';
import PinListContainer from './_components/PinListContainer';
import ChallengePinContainer from './_components/ChallengePinContainer';
import ChallengeTopicContainer from './_components/ChallengeTopicContainer';
import UserListContainer from './_components/UserListContainer';
import { useEffect, useState } from 'react';
import Button from '@/components/Buttons/Button';
import SearchInput from '@/components/InputBox/SearchInput/SearchInput';

const comboBoxOptions = [
  {
    id: 'first',
    optionName: '전체 게시글',
    optionComponent: <PinListContainer />,
  },
  {
    id: 'second',
    optionName: '챌린지에 등록된 핀',
    optionComponent: <ChallengePinContainer />,
  },
  {
    id: 'third',
    optionName: '챌린지 주제',
    optionComponent: <ChallengeTopicContainer />,
  },
  {
    id: 'fourth',
    optionName: '유저 목록',
    optionComponent: <UserListContainer />,
  },
];

export default function Admin() {
  const STORAGE_KEY = 'adminMainOptionIndex';
  const [menubarSelected, setMenubarSelected] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>(
    comboBoxOptions[0].id,
  );
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSelectedOption = sessionStorage.getItem(STORAGE_KEY);
      if (
        savedSelectedOption &&
        comboBoxOptions.some((opt) => opt.id === savedSelectedOption)
      ) {
        setSelectedOption(savedSelectedOption);
      }
    }
  }, []);

  const handleOptionSelect = (optionId: string) => setSelectedOption(optionId);

  return (
    <div className={style.Admin}>
      <div className={style.navigation}>
        <ComboBox
          options={comboBoxOptions}
          onSelect={handleOptionSelect}
          sessionStorageKey={STORAGE_KEY}
        />
        <MenuBar setMenubarSelected={setMenubarSelected} />
      </div>
      {menubarSelected === 'search' && (
        <div className={style.searchbox}>
          <SearchInput
            value={''}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      )}
      {menubarSelected === 'sort' && (
        <ul className={style.sortbox}>
          {['최신순', '제목순(가나다)', 'ID오름차순', 'ID내림차순'].map(
            (label) => (
              <li key={label}>
                <Button label={label} />
              </li>
            ),
          )}
        </ul>
      )}
      {
        comboBoxOptions.find((option) => option.id === selectedOption)
          ?.optionComponent
      }
    </div>
  );
}
