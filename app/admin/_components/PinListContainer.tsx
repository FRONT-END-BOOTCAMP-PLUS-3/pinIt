'use client';

import style from '@/app/admin/page.module.scss';
import HorizontalScrollHook from './HorizontalScrollHook';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import { Dispatch, SetStateAction, useState } from 'react';

const PinListContainer = (
  {setCheckedItems}:{setCheckedItems?:Dispatch<SetStateAction<string[]>>;}
) => {
  const mockData = [
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
    {
      id: '4',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '5',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '3234123fd0',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '6',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '7',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '8',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '9',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '10',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '11',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '12',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '13',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '14',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '15',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '16',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '17',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '18',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '19',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '20',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '21',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
    {
      id: '22',
      contents: '제주 도두봉 올라가는 길!',
      location: '도두봉',
      address: '제주 도두봉',
    },
  ];

  /* 체크박스 관련 설정 시작 */
  // 체크된 항목을 관리하는 useState
  const [checked, setChecked] = useState<string[]>([]);
  // 개별 체크박스 클릭 핸들러
  const handleCheckboxChange = (id: string) => {
    if (setCheckedItems) { // setCheckedItems가 정의된 경우에만 호출
      setCheckedItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
      setChecked((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };
  // 전체 선택 체크박스 핸들러
  const handleSelectAll = () => {
    setCheckedItems?.((prev) => (prev.length === mockData.length ? [] : mockData.map(item => item.id)));
    setChecked((prev) => (prev.length === mockData.length ? [] : mockData.map(item => item.id)));
  };
  /* 체크박스 관련 설정 끝 */

  const {
    scrollWrapperRef,
    scrollContentTopRef,
    scrollContentBottomRef,
    scrollHeaderTopRef,
    scrollHeaderBottomRef,
    tableWrapperRef,
    syncScroll,
  } = HorizontalScrollHook(); // 리스트 가로 스크롤 설정 훅 사용

  const router = useRouter(); // onClick 또는 onClickEvent를 통한 페이지 이동에 필요

  return (
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
                  onChange={handleSelectAll}
                />
              </th>
              {Object.keys(mockData[0]).map((item, index) => (
                <th key={index} scope='col'>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockData.map((item) => (
              <tr key={item.id} className={style.listItem}>
                <td>
                  <input
                    type="checkbox"
                    checked={checked?.includes(item.id) ?? false} 
                    onChange={(e) => {
                      e.stopPropagation(); // 체크박스 클릭 시 row 클릭 이벤트 방지
                      handleCheckboxChange(item.id);
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
  );
};

export default PinListContainer;
