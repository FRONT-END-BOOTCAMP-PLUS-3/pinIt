import styles from '../searchPage.module.scss';

const users = [
  { name: '안녕', profileImg: 'https://via.placeholder.com/100' },
  { name: '하세여', profileImg: 'https://via.placeholder.com/100' },
  { name: '저는', profileImg: 'https://via.placeholder.com/100' },
  { name: '아현입니다', profileImg: 'https://via.placeholder.com/100' },
  { name: 'ㅎ', profileImg: 'https://via.placeholder.com/100' },

  { name: '안녕하세요', profileImg: 'https://via.placeholder.com/100' },

  { name: '하잉', profileImg: 'https://via.placeholder.com/100' },

  { name: '하하', profileImg: 'https://via.placeholder.com/100' },

  {
    name: 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ',
    profileImg: 'https://via.placeholder.com/100',
  },
  { name: '닉네임', profileImg: 'https://via.placeholder.com/100' },
];

const UserTab: React.FC = () => {
  return (
    <div className={styles.userTabContainer}>
      <ul className={styles.userList}>
        {users.map(({ name, profileImg }) => (
          <li key={name} className={styles.userItem}>
            <div className={styles.profileImg}></div>
            <span className={styles.userName}>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTab;
