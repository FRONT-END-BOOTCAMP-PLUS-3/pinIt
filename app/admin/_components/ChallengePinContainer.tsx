'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import { useEffect, useRef, useState } from 'react';

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

const ChallengePinContainer: React.FC = () => {
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

    const [selectedOption, setSelectedOption] = useState<ComboBoxOption>(options[0]);

    // if (!selectedOption.optionData || selectedOption.optionData.length === 0) {
    //   return <div>데이터가 없습니다.</div>;
    // }

    const scrollWrapperRef = useRef<HTMLDivElement>(null);
    const scrollContentTopRef = useRef<HTMLDivElement>(null);
    const scrollContentBottomRef = useRef<HTMLDivElement>(null);
    const scrollHeaderTopRef = useRef<HTMLDivElement>(null);
    const scrollHeaderBottomRef = useRef<HTMLDivElement>(null);
    const tableWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const updateWidth = () => {
        const tableWidth = tableWrapperRef.current?.scrollWidth || 0;
        scrollContentTopRef.current?.style.setProperty('--scroll-width', `${tableWidth}px`);
        scrollContentBottomRef.current?.style.setProperty('--scroll-width', `${tableWidth}px`);
      };
    
      updateWidth(); // 초기값 설정
      window.addEventListener('resize', updateWidth); // 리사이즈 이벤트 바인딩
    
      return () => {
        window.removeEventListener('resize', updateWidth); // 이벤트 제거
      };
    }, []);

    const syncScroll = (source: "scroll_top" | "scroll_bottom" | "table") => {
        if (scrollHeaderTopRef.current && tableWrapperRef.current) {
            if (source === "scroll_top") {
                tableWrapperRef.current.scrollLeft = scrollHeaderTopRef.current.scrollLeft;
            } else {
                scrollHeaderTopRef.current.scrollLeft = tableWrapperRef.current.scrollLeft;
            }
        }
        if (scrollHeaderBottomRef.current && tableWrapperRef.current) {
            if (source === "scroll_bottom") {
                tableWrapperRef.current.scrollLeft = scrollHeaderBottomRef.current.scrollLeft;
            } else {
                scrollHeaderBottomRef.current.scrollLeft = tableWrapperRef.current.scrollLeft;
            }
        }
    };

  return (
    <>
    <div className={`${style.navigation} ${style.sub}`}>
      <ComboBox options={options} onSelect={setSelectedOption} sub={true} />
    </div>
    <div className={style.scroll_wrapper} ref={scrollWrapperRef}>
      <div className={style.scroll_header} ref={scrollHeaderTopRef} onScroll={() => syncScroll("scroll_top")}>
        <div className={style.scroll_content} ref={scrollContentTopRef}></div>
      </div>
      <div className={style.listContainer_wrapper} ref={tableWrapperRef} onScroll={() => syncScroll("table")}>
        <table className={style.listContainer}>
          <thead>
            <tr className={style.listHeader}>
                {Object.keys(selectedOption.optionData![0]).map((item, index) => (
                  <th key={index} scope='col'>
                    {item}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
          {selectedOption.optionData!.map((item) => (
              <tr
                key={item.id}
                className={style.listItem}
                onClick={() => {
                  console.log('hi');
                }}
              >
                {Object.values(item).map((details, index) => (
                  <td key={index}>{details}</td>
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
