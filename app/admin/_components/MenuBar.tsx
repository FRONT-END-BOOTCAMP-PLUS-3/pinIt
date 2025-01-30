'use client';

import style from '@/app/admin/page.module.scss';
import Icon from '@/components/Icon/Icon';

const MenuBar = () => {
  const menus = ['search', 'sort', 'trash'];
  return (
    <ul className={style.menuBar}>
      {menus.map((item) => (
        <li key={item} className={style.menuItem}>
          <button type='button'>
            <Icon id={item} color='black' width={20} height={20} />
            <span>{item}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MenuBar;
