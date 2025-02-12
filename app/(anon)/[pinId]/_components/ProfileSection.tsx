'use client';

import Link from 'next/link';
import styles from '../pinDetail.module.scss';
import HeartIconButton from '@/components/Buttons/HeartIconButton';
import { deleteLike } from '../../like/_api/deleteLike';
import { createLike } from '../../like/_api/createLike';
import { useEffect, useState } from 'react';

interface ProfileProps {
  pinId: string;
  nickname: string;
  userId: string;
  profileImg: string;
  isLiked: boolean;
  countLike: number;
}

const ProfileSection: React.FC<{ profile: ProfileProps }> = ({ profile }) => {
  const [isliked, setIsliked] = useState(profile.isLiked);
  const [countlike, setCountlike] = useState(profile.countLike);

  useEffect(() => {
    setIsliked(profile.isLiked);
  }, [profile.isLiked]);
  useEffect(() => {
    setCountlike(profile.countLike);
  }, [profile.countLike]);

  const handleLikeToggle = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    liked: boolean,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (liked) {
        setIsliked(false); // 좋아요 취소
        setCountlike((prev) => Math.max(prev - 1, 0)); // 0 이하로 내려가지 않도록
        await deleteLike(id);
      } else {
        setIsliked(true); // 좋아요 추가
        setCountlike((prev) => prev + 1);
        await createLike({ id });
      }
    } catch (error) {
      console.error('🚨 좋아요 상태 변경 실패:', error);
    }
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
            liked={isliked}
            w={20}
            h={20}
            onClickLikeButton={(e) =>
              handleLikeToggle(e, profile.pinId, isliked)
            }
          />
        </span>
        <span>{countlike}</span>
      </div>
    </div>
  );
};

export default ProfileSection;
