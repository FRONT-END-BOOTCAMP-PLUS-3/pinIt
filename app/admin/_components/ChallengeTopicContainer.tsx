'use client';

import style from '@/app/admin/page.module.scss';
import Button from '@/components/Buttons/Button';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import HorizontalScrollHook from './HorizontalScrollHook';
import { Dispatch, SetStateAction, useState } from 'react';

const ChallengeTopicContainer = (
    {setCheckedItems}:{setCheckedItems?:Dispatch<SetStateAction<string[]>>;}
) => {
    const mockData = [
        {
          id: '1',
          subject: '눈 내리는 겨울',
        },
        {
          id: '2',
          subject: '울긋불긋 가을 단풍',
        },
        {
          id: '3',
          subject: '아름다운 야경',
        },
    ];

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
    // 체크된 항목을 관리하는 상태
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

    const router = useRouter(); // onClick 또는 onClickEvent를 통한 페이지 이동에 필요

    return (
        <>
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
                                <th key={index} scope='col'>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((item) => (
                            <tr key={item.id} className={style.listItem}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={checked?.includes(item.id)}
                                        onChange={(e) => {
                                            e.stopPropagation(); // 체크박스 클릭 시 row 클릭 이벤트 방지
                                            handleCheckboxChange(item.id);
                                        }}
                                    />
                                </td>
                                {Object.values(item).map((details, index) => (
                                    <td key={index} onClick={() => {
                                        // 템플릿 리터럴(문자열 내에서 변수를 삽입)
                                        /* RouteConfig에 설정된 속성명을 불러온 다음
                                        (detail: '/admin/topic/[topic-id]')
                                        속성에 지정된 경로 문자열을 동적으로 교체
                                        ('/admin/topic/[topic-id]'→'/admin/topic/[map에서 전달받은 item.id]') */
                                        router.push(ROUTES.admin.topic.detail.replace('[topic-id]', item.id));
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
        <div className={style.create_button}>
            <Button
                icon='create'
                label='생성하기'
                onClickButton={() => {
                    router.push(ROUTES.admin.topic.create); // Router를 통해 push해서 이동
                }}
            />
        </div>
        </>
    );
}

export default ChallengeTopicContainer;