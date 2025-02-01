'use client';

import style from '@/app/admin/page.module.scss';
import HorizontalScrollHook from './HorizontalScrollHook';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

const UserListContainer = () => {
    const mockData = [
        {
            id: '1',
            nickname: '하이룽',
            email: 'id@email.com',
        },
        {
            id: '2',
            nickname: '안녕하세요',
            email: 'hello@email.com',
        },
        {
            id: '3',
            nickname: '와우우우우우우우웅',
            email: 'wow@email.com',
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
      <div className={style.scroll_wrapper} ref={scrollWrapperRef}>
        <div className={style.scroll_header} ref={scrollHeaderTopRef} onScroll={() => syncScroll("scroll_top")}>
          <div className={style.scroll_content} ref={scrollContentTopRef}></div>
        </div>
        <div className={style.listContainer_wrapper} ref={tableWrapperRef} onScroll={() => syncScroll("table")}>
          <table className={style.listContainer}>
            <thead>
              <tr className={style.listHeader}>
                {Object.keys(mockData[0]).map((item, index) => (
                  <th key={index} scope='col'>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockData.map((item) => (
                <tr
                  key={item.id}
                  className={style.listItem}
                  onClick={() => {
                    console.log('hi');
                    // 템플릿 리터럴(문자열 내에서 변수를 삽입)
                    /* RouteConfig에 설정된 속성명을 불러온 다음
                    (userDetail: '/admin/user/[user-id]')
                    속성에 지정된 경로 문자열을 동적으로 교체
                    ('/admin/user/[user-id]'→'/admin/user/[map에서 전달받은 item.id]') */
                    router.push(ROUTES.admin.userDetail.replace('[user-id]', item.id));
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
    );
}

export default UserListContainer;