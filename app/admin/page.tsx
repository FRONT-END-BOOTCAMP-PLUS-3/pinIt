'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import PinListContainer from './_components/PinListContainer';
import ChallengePinContainer from './_components/ChallengePinContainer';
import ChallengeTopicContainer from './_components/ChallengeTopicContainer';
import UserListContainer from './_components/UserListContainer';
import { useEffect, useState } from 'react';
import SearchInput from '@/components/InputBox/SearchInput/SearchInput';
import MenuBar from './_components/MenuBar';

const comboBoxOptions = [
  {
    id: 'first',
    optionName: '전체 게시글',
    optionComponent: PinListContainer,
  },
  {
    id: 'second',
    optionName: '챌린지에 등록된 핀',
    optionComponent: ChallengePinContainer,
  },
  {
    id: 'third',
    optionName: '챌린지 주제',
    optionComponent: ChallengeTopicContainer,
  },
  {
    id: 'fourth',
    optionName: '유저 목록',
    optionComponent: UserListContainer,
  },
];

export default function Admin() {
  const STORAGE_KEY = 'adminMainOptionIndex';
  const [menubarSelected, setMenubarSelected] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>(
    comboBoxOptions[0].id,
  );
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('최신순');
  const [trashClicked, setTrashClicked] = useState<boolean>(false); // 🚀 추가

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

  const SelectedComponent = comboBoxOptions.find(
    (option) => option.id === selectedOption,
  )?.optionComponent;

  const onClickSortButton = (sortType: string) => {
    if (sortOption !== sortType) {
      setSortOption(sortType);
    }
  };

  // trash 버튼이 클릭되면 `trashClicked`를 true로 설정 후 일정 시간 후 false로 변경
  const handleTrashClick = () => {
    setTrashClicked(true);
    setTimeout(() => {
      setTrashClicked(false);
    }, 100); // 100ms 뒤에 다시 false로 초기화 (즉시 전달 후 리셋)
  };

  return (
    <div className={style.Admin}>
      <div className={style.navigation}>
        <ComboBox
          options={comboBoxOptions}
          onSelect={handleOptionSelect}
          sessionStorageKey={STORAGE_KEY}
        />
        <MenuBar
          setMenubarSelected={setMenubarSelected}
          onTrashClick={handleTrashClick}
        />{' '}
      </div>
      {menubarSelected === 'search' && (
        <div className={style.searchbox}>
          <SearchInput
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      )}
      {menubarSelected === 'sort' && (
        <ul className={style.sortbox}>
          {['최신순', '제목 오름차순'].map((label) => (
            <li key={label}>
              <button
                className={`${style.sortButton} ${sortOption === label ? style.selected : ''}`}
                onClick={() => onClickSortButton(label)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {SelectedComponent && (
        <SelectedComponent
          searchKeyword={searchKeyword}
          sortOption={sortOption}
          trashClicked={trashClicked}
        />
      )}
    </div>
  );
}
