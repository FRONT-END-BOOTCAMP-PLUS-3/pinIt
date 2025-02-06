'use client';

import style from '@/app/admin/page.module.scss';
import { useRouter } from 'next/navigation';

interface ListComponentProps<T> {
  data: T[];
  setCheckedItems?: React.Dispatch<React.SetStateAction<string[]>>;
  checkedItems?: string[];
  routePath: string;
}

const ListComponent = <T extends { id: string }>({
  data,
  setCheckedItems,
  checkedItems = [],
  routePath,
}: ListComponentProps<T>) => {
  const router = useRouter();

  const handleCheckboxChange = (id: string) => {
    if (setCheckedItems) {
      setCheckedItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    }
  };

  const handleSelectAll = () => {
    if (setCheckedItems) {
      setCheckedItems((prev) =>
        prev.length === data.length ? [] : data.map((item) => item.id),
      );
    }
  };

  return (
    <div className={style.listContainer_wrapper}>
      <table className={style.listContainer}>
        <thead>
          <tr className={style.listHeader}>
            <th scope='col'>
              <input type='checkbox' onChange={handleSelectAll} />
            </th>
            {data.length > 0 &&
              Object.keys(data[0]).map((key, index) => (
                <th key={index} scope='col'>
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className={style.listItem}>
              <td>
                <input
                  type='checkbox'
                  checked={checkedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
              {Object.values(item).map((details, index) => (
                <td
                  key={index}
                  onClick={() =>
                    router.push(routePath.replace('[id]', item.id))
                  }
                >
                  {details as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListComponent;
