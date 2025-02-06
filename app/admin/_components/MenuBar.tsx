'use client';

import style from '@/app/admin/page.module.scss';
import Icon from '@/components/Icon/Icon';

const MenuBar = ({
  setMenubarSelected,
  onTrashClick,
}: {
  setMenubarSelected: React.Dispatch<React.SetStateAction<string | null>>;
  onTrashClick: () => void;
}) => {
  const menus = ['search', 'sort', 'trash'];

  const handleMenuClick = (item: string) => {
    setMenubarSelected((prev) => (prev === item ? null : item));
    if (item === 'trash') {
      onTrashClick(); // ✅ `trash` 클릭 시 `onTrashClick` 호출
    }
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
