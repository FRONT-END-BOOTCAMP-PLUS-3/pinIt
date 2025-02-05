'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../searchPage.module.scss';
import { searchPinByUser } from '../_api/searchPinByUser';

const UserTab: React.FC<{ keyword: string }> = ({ keyword }) => {
  const [users, setUsers] = useState<
    { id: string; nickname: string; profileImg: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const fetchedUsers = await searchPinByUser(keyword);
      setUsers(fetchedUsers);
      setLoading(false);
    };

    if (keyword.trim()) {
      fetchUsers();
    }
  }, [keyword]); // 키워드 변경 시 API 호출

  return (
    <div className={styles.userTabContainer}>
      {loading ? (
        <p>검색어를 입력하세요.</p>
      ) : (
        <ul className={styles.userList}>
          {users.length > 0 ? (
            users.map((user) => (
              <Link href={`/profile/${user.id}`} key={user.id}>
                <li className={styles.userItem}>
                  <img
                    className={styles.profileImg}
                    src={user.profileImg}
                    alt='프로필 이미지'
                  />

                  <span className={styles.userName}>{user.nickname}</span>
                </li>
              </Link>
            ))
          ) : (
            <p>검색된 사용자가 없습니다.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserTab;
