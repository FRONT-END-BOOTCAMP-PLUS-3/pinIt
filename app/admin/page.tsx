'use client';

import style from '@/app/admin/page.module.scss';
import ComboBox from '@/components/ComboBox/ComboBox';
import MenuBar from './_components/MenuBar';
import ListContainer from './_components/ListContainer';

export default function Admin() {
  return (
    <div className={style.Admin}>
      <div className={style.navigation}>
        <ComboBox options={['전체 게시글', '챌린지 토픽']} />
        <MenuBar />
      </div>
      <ListContainer />
    </div>
  );
}
