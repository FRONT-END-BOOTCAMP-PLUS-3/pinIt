import { JSX, useState } from 'react';

// 핀 데이터 인터페이스(없으면 ComboBoxOption에서 optionData에 넣을 타입이 없음)
interface PinData {
  id: string;
  contents: string;
  location: string;
  address: string;
}

// 매개변수로 옵션 데이터를 전달받기 위한 인터페이스
interface ComboBoxOption {
  optionName: string;
  optionComponent?: JSX.Element;
  optionPeriodStart?: string;
  optionPeriodEnd?: string;
  optionData?: PinData[];
}

// ComboBox 옵션 선택 기능 & 선택했던 옵션 기억 기능 훅
const ComboBoxOptionSelect = (options: ComboBoxOption[], OPTION_KEY: string) => {
  // localStorage에서 이전에 선택된 옵션의 index를 OPTION_KEY 매개변수를 통해 가져오기
  const savedOptionIndex = localStorage.getItem(OPTION_KEY);

  // localStorage에 저장된 키를 옵션 인덱스 값으로 지정(없으면 '0'으로 지정하고 OPTION_KEY로 키값 지정해서 localStorage에 저장)
  const initialSelectedOption = savedOptionIndex && !isNaN(parseInt(savedOptionIndex))
    ? parseInt(savedOptionIndex)
    : 0; // 없으면 기본 첫 번째 옵션 설정
    const initialSelectedOptionIndex = initialSelectedOption;

  // 챌린지 주제에 맞는 리스트를 선택해서 보여주기 위한 설정 (useState로 옵션 값 저장 및 설정)
  const [selectedOption, setSelectedOption] = useState<ComboBoxOption>(options[initialSelectedOption]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(initialSelectedOptionIndex); // index 상태 추가

  /* 선택된 옵션이 변경될 때마다 localStorage에 저장 */
  const handleOptionSelect = 
    // 한 개 옵션에 대한 전체 정보와, 해당 옵션의 인덱스 값을 같이 가져와서 안정성 높임
    (option: ComboBoxOption, index: number) => {
    // onSelect를 통해 option을 선택한 옵션의 내용으로 출력해준다.
    setSelectedOption(option);
    setSelectedOptionIndex(index);
    // index를 localStorage에 저장(OPTION_KEY를 값에 대한 키로 함)
    localStorage.setItem(OPTION_KEY, index.toString());
  };

  // 함수 2개(옵션에 대한 데이터, 옵션의 index)를 export한다.
  return { selectedOption, handleOptionSelect, selectedOptionIndex };
}

export default ComboBoxOptionSelect;