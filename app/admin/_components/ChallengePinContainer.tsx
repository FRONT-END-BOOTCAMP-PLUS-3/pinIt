'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import HorizontalScrollHook from './HorizontalScrollHook';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import ComboBoxOptionSelect from './ComboBoxOptionSelect';
import { Dispatch, SetStateAction, useState } from 'react';

interface PinData {
  id: string;
  contents: string;
  location: string;
  address: string;
}

interface ComboBoxOption {
  optionName: string;
  optionPeriodStart?: string;
  optionPeriodEnd?: string;
  optionData?: PinData[];
}

const ChallengePinContainer = ({setCheckedItems}:{setCheckedItems?:Dispatch<SetStateAction<string[]>>;}) => {
  const mockData1: PinData[] = [
    {
      id: '1',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '2',
      contents: '남산 타워에서 찍었어요',
      location: '남산타워',
      address: '서울시 용산구',
    },
    {
      id: '3',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
  ];
    
  const mockData2: PinData[] = [
    {
      id: '1',
      contents: '서울 올림픽공원 방문',
      location: '올림픽공원',
      address: '서울 송파구',
    },
    // 추가적인 데이터
  ];

  const options: ComboBoxOption[] = [
    { 
      optionName: '눈 내리는 겨울', 
      optionPeriodStart: '2025-01-01', 
      optionPeriodEnd: '2025-01-15',
      optionData: mockData1 
    },
    { 
      optionName: '봄의 시작', 
      optionPeriodStart: '2025-01-01', 
      optionPeriodEnd: '2025-01-15',
      optionData: mockData2 
    }
  ];

  /* ComboBox 옵션 설정 시작 */

  // 선택했던 옵션을 저장하기 위한 고유한 키 이름
  const OPTION_KEY = 'challengePinOptionIndex';
  // 다른 페이지로 이동 후 되돌아오거나, admin 페이지를 다시 접속할 때 선택했던 ComboBox 옵션 기억
  // (onSelect={handleOptionSelect}로 사용)
  const { selectedOption, handleOptionSelect, selectedOptionIndex } = ComboBoxOptionSelect(options, OPTION_KEY);

  /* ComboBox 옵션 설정 끝 */

  const {
    scrollWrapperRef,
    scrollContentTopRef,
    scrollContentBottomRef,
    scrollHeaderTopRef,
    scrollHeaderBottomRef,
    tableWrapperRef,
    syncScroll,
  } = HorizontalScrollHook(); // 리스트 가로 스크롤 설정 훅 사용

  /* 체크박스 관련 설정 시작 */
  // 체크된 항목을 관리하는 useState
  const [checkedItemsState, setCheckedItemsState] = useState<{ [key: number]: string[] }>({});
  // 개별 체크박스 클릭 핸들러
  const handleCheckboxChange = (id: string, index: number) => {
    setCheckedItemsState((prev) => {
      const newCheckedItems = prev[index] ?? [];
      const updatedCheckedItems = newCheckedItems.includes(id)
        ? newCheckedItems.filter((item) => item !== id)
        : [...newCheckedItems, id];

      return { ...prev, [index]: updatedCheckedItems };
    });

    // 부모 컴포넌트에서 setCheckedItems를 호출하여 상태를 업데이트
    if (setCheckedItems) {
      setCheckedItems((prev) => {
        return prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      });
    }
  };
  // 전체 선택 체크박스 핸들러
  const handleSelectAll = (index: number, data: PinData[]) => {
    setCheckedItemsState((prev) => {
      const isAllSelected = prev[index]?.length === data.length;
      const newCheckedItems = isAllSelected ? [] : data.map((item) => item.id);

      return { ...prev, [index]: newCheckedItems };
    });

    // 부모 컴포넌트에서 setCheckedItems를 호출하여 상태를 업데이트
    if (setCheckedItems) {
      setCheckedItems((prev) => (prev.length === data.length ? [] : data.map((item) => item.id)));
    }
  };
  /* 체크박스 관련 설정 끝 */

  const router = useRouter(); // onClick 또는 onClickEvent를 통한 페이지 이동에 필요

  return (
    <>
    <div className={`${style.navigation} ${style.sub}`}>
      <ComboBox options={options} onSelect={handleOptionSelect} sub={true} localStorageKey={OPTION_KEY} />
    </div>
    <div className={style.scroll_wrapper} ref={scrollWrapperRef}>
      <div className={style.scroll_header} ref={scrollHeaderTopRef} onScroll={() => syncScroll("scroll_top")}>
        <div className={style.scroll_content} ref={scrollContentTopRef}></div>
      </div>
      <div className={style.listContainer_wrapper} ref={tableWrapperRef} onScroll={() => syncScroll("table")}>
        <table className={style.listContainer}>
          <thead>
            <tr className={style.listHeader}>
              <th scope='col'>
                <input 
                  type="checkbox"
                  onChange={() => handleSelectAll(selectedOptionIndex, selectedOption.optionData!)}
                />
              </th>
              {Object.keys(selectedOption.optionData![0]).map((item, index) => (
                <th key={index} scope='col'>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {selectedOption.optionData!.map((item) => (
              <tr key={item.id} className={style.listItem}>
                <td>
                  <input
                    type="checkbox"
                    checked={checkedItemsState[selectedOptionIndex]?.includes(item.id) ?? false}
                    onChange={(e) => {
                      e.stopPropagation(); // 체크박스 클릭 시 row 클릭 이벤트 방지
                      handleCheckboxChange(item.id, selectedOptionIndex);
                    }}
                  />
                </td>
                {Object.values(item).map((details, index) => (
                  <td key={index} onClick={() => {
                    // 템플릿 리터럴(문자열 내에서 변수를 삽입)
                    /* RouteConfig에 설정된 속성명을 불러온 다음 (detail: '/[pin-id]')
                    속성에 지정된 경로 문자열을 동적으로 교체 ('/[pin-id]'→'/[map에서 전달받은 item.id]') */
                    router.push(ROUTES.pin.detail.replace('[pin-id]', item.id));
                  }}>{details}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={style.scroll_header} ref={scrollHeaderBottomRef} onScroll={() => syncScroll("scroll_bottom")}>
        <div className={style.scroll_content} ref={scrollContentBottomRef}></div>
      </div>
    </div>
    </>
  );
};

export default ChallengePinContainer;
