'use client';

import Link from 'next/link';
import styles from '../pinDetail.module.scss';
import HeartIconButton from '@/components/Buttons/HeartIconButton';

interface ProfileProps {
  nickname: string;
  userId: string;
  profileImg: string;
  isLiked: boolean;
  countLike: number;
}

const ProfileSection: React.FC<{ profile: ProfileProps }> = ({ profile }) => {
  const handleLikeButtonClick = () => {
    console.log('Like button clicked');
    // 좋아요 상태 관리 로직 추가 가능
  };

  return (
    <div className={styles.profileSection}>
      <Link className={styles.profile} href={`profile/${profile.userId}`}>
        <span className={styles.profileImage}>
          <img src={profile.profileImg} alt='프로필 이미지' />
        </span>
        <span className={styles.profileName}>{profile.nickname}</span>
      </Link>
      <div className={styles.likeInfo}>
        <span className={styles.likeButton}>
          <HeartIconButton
            heartColor={'#292526'}
            liked={profile.isLiked}
            w={20}
            h={20}
            onClickLikeButton={handleLikeButtonClick}
          />
        </span>
        <span>{profile.countLike}</span>
      </div>
    </div>
  );
};

export default ProfileSection;
