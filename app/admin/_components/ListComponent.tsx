'use client';

import style from '@/app/admin/page.module.scss';
import { useRouter } from 'next/navigation';

interface ListComponentProps<T> {
  data: T[];
  setCheckedItems?: React.Dispatch<React.SetStateAction<string[]>>;
  checkedItems?: string[];
  routePath: string;
  sortOption?: string; // 정렬 방법 (ex: "최신순", "제목 오름차순")
  sortKey?: keyof T; // 정렬 기준이 될 키값 (ex: )
}

const ListComponent = <T extends { id: string }>({
  data,
  setCheckedItems,
  checkedItems = [],
  routePath,
  sortOption = '최신순',
  sortKey,
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

  // 정렬 기준으로 데이터 정렬 (sortKey가 있을 때만 정렬)
  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        if (sortOption === '제목 오름차순') {
          return String(a[sortKey]).localeCompare(String(b[sortKey]));
        }
        return 0; // 최신순(기본값)일 경우 원본 데이터 유지
      })
    : data;

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
          {sortedData.map((item) => (
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
