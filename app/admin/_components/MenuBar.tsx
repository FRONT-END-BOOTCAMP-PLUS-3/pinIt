'use client';

import style from '@/app/admin/page.module.scss';
import Icon from '@/components/Icon/Icon';

const MenuBar = ({setMenubarSelected, checkedItems}: {setMenubarSelected: React.Dispatch<React.SetStateAction<string | null>>; checkedItems: string[];}) => {
  const menus = ['search', 'sort', 'trash'];

  const handleMenuClick = (item: string) => {
    setMenubarSelected((prev) => (prev === item ? null : item));
    console.log(checkedItems);
  };
  
  return (
    <ul className={style.menuBar}>
      {menus.map((item) => (
        <li key={item} className={style.menuItem}>
          <button type='button' onClick={() => handleMenuClick(item)}>
            <Icon id={item} color='black' width={20} height={20} />
            <span>{item}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MenuBar;
