'use client';

import style from '@/app/admin/page.module.scss';
import Button from '@/components/Buttons/Button';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import HorizontalScrollHook from './HorizontalScrollHook';

const ChallengeTopicContainer = () => {
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
                            {Object.keys(mockData[0]).map((item, index) => (
                                <th key={index} scope='col'>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {mockData.map((item) => (
                            <tr key={item.id} className={style.listItem}
                                onClick={() => {
                                    // 템플릿 리터럴(문자열 내에서 변수를 삽입)
                                    /* RouteConfig에 설정된 속성명을 불러온 다음
                                    (detail: '/admin/topic/[topic-id]')
                                    속성에 지정된 경로 문자열을 동적으로 교체
                                    ('/admin/topic/[topic-id]'→'/admin/topic/[map에서 전달받은 item.id]') */
                                    router.push(ROUTES.admin.topic.detail.replace('[topic-id]', item.id));
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