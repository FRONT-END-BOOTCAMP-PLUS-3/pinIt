'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import MenuBar from './_components/MenuBar';
import PinListContainer from './_components/PinListContainer';
import ChallengePinContainer from './_components/ChallengePinContainer';
import ChallengeTopicContainer from './_components/ChallengeTopicContainer';
import UserListContainer from './_components/UserListContainer';
import { JSX, useEffect, useState } from 'react';
import ComboBoxOptionSelect from './_components/ComboBoxOptionSelect';
import InputBox from '@/components/InputBox/InputBox/InputBox';
import Button from '@/components/Buttons/Button';
import React from 'react';

interface ComboBoxOption {
  optionName: string;
  optionComponent?: JSX.Element;
}

const comboBoxOptions: ComboBoxOption[] = [
  { optionName: '전체 게시글', optionComponent: <PinListContainer /> },
  { optionName: '챌린지에 등록된 핀', optionComponent: <ChallengePinContainer /> },
  { optionName: '챌린지 주제', optionComponent: <ChallengeTopicContainer /> },
  { optionName: '유저 목록', optionComponent: <UserListContainer /> },
];

export default function Admin() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    console.log('Checked Items from page.tsx:', checkedItems);
  }, [checkedItems]);

  // `optionComponent`가 존재하는 경우, `activeFeature`와 `onDelete`를 추가하여 새로운 옵션 배열 생성
  const options = comboBoxOptions.map((option) => ({
    ...option,
    optionComponent:
    option.optionComponent !== undefined
      ? React.cloneElement(option.optionComponent, {
          setCheckedItems,
          // onCheckboxChange: handleCheckboxChange,
        })
      : undefined,
  }));
  
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // 폼 데이터 처리 로직 작성
    console.log('Form submitted');
  };
  
  /* ComboBox 옵션 설정 시작 */

  // 선택했던 옵션을 저장하기 위한 고유한 키 이름
  const OPTION_KEY = 'adminMainOptionIndex';
  // 다른 페이지로 이동 후 되돌아오거나, admin 페이지를 다시 접속할 때 선택했던 ComboBox 옵션 기억
  // (onSelect={handleOptionSelect}로 사용)
  const { selectedOption, handleOptionSelect } = ComboBoxOptionSelect(options, OPTION_KEY);

  /* ComboBox 옵션 설정 끝 */


  /* 통합 상태 관리 */
  const [menubarSelected, setMenubarSelected] = useState<string | null>(null);
  
  // 리스트 아이템 삭제
  // 아이콘 클릭여부 boolean
  const [isTrashClicked, setIsTrashClicked] = useState(false);
  useEffect(() => {
    if (menubarSelected === 'trash' && !isTrashClicked) {
      setIsTrashClicked(true); // trash가 클릭되었음을 표시
      if (checkedItems.length > 0) {
        console.log(`There are ${checkedItems.length} items marked for deletion:`);
        checkedItems.forEach((item) => {
          console.log(`Item ID: ${item}`);
        });
      } else {
        console.log('No items to delete');
      }
    } else if (menubarSelected !== 'trash') {
      setIsTrashClicked(false); // trash가 아닌 다른 메뉴가 선택되면 초기화
    }
  }, [menubarSelected, checkedItems, isTrashClicked]);

  return (
    <div className={style.Admin}>
      <div className={style.navigation}>
        <ComboBox options={options} onSelect={handleOptionSelect} localStorageKey={OPTION_KEY} />
        <MenuBar checkedItems={checkedItems} setMenubarSelected={setMenubarSelected} />
      </div>
      {menubarSelected === 'search' && 
      <div className={style.searchbox}>
        <InputBox rightIcon='save' placeholder={'검색어를 입력하세요.'} />
      </div>
      }
      {menubarSelected === 'sort' &&
      <ul className={style.sortbox}>
        <li><Button label={'최신순'} onClickButton={handleSubmit} /></li>
        <li><Button label={'제목순(가나다)'} onClickButton={handleSubmit} /></li>
        <li><Button label={'ID오름차순'} onClickButton={handleSubmit} /></li>
        <li><Button label={'ID내림차순'} onClickButton={handleSubmit} /></li>
      </ul>}
      {selectedOption.optionComponent}
    </div>
  );
}
