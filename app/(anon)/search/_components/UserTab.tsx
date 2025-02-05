'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../searchPage.module.scss';
import { searchPinByUser } from '../_api/searchPinByUser';
import Icon from '@/components/Icon/Icon'; // ✅ 아이콘 추가

const UserTab: React.FC<{ keyword: string }> = ({ keyword }) => {
  const [users, setUsers] = useState<
    { id: string; nickname: string; profileImg: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUsers = sessionStorage.getItem('searchedUsers');
    const savedKeyword = sessionStorage.getItem('searchedKeyword');

    if (savedUsers && savedKeyword === keyword) {
      setUsers(JSON.parse(savedUsers));
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      const fetchedUsers = await searchPinByUser(keyword);
      setUsers(fetchedUsers);
      sessionStorage.setItem('searchedUsers', JSON.stringify(fetchedUsers));
      sessionStorage.setItem('searchedKeyword', keyword);
      setLoading(false);
    };

    if (keyword.trim()) {
      fetchUsers();
    }
  }, [keyword]);

  return (
    <div className={styles.userTabContainer}>
      {loading ? (
        <p className={styles.searchMessage}>검색어를 입력하세요.</p>
      ) : users.length > 0 ? (
        <ul className={styles.userList}>
          {users.map((user) => (
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
          ))}
        </ul>
      ) : (
        <p className={styles.searchMessage}>
          <Icon id='banned' width={20} height={20} color='#777' /> 검색된
          사용자가 없습니다.
        </p>
      )}
    </div>
  );
};

export default UserTab;
