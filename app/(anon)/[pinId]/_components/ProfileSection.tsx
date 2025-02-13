'use client';

import Link from 'next/link';
import styles from '../pinDetail.module.scss';
import HeartIconButton from '@/components/Buttons/HeartIconButton';
import { deleteLike } from '../../like/_api/deleteLike';
import { createLike } from '../../like/_api/createLike';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { checkPinUserId } from '../_api/checkPinUserId';

interface ProfileProps {
  pinId: string;
  nickname: string;
  userId: string;
  profileImg: string;
  isLiked: boolean;
  countLike: number;
}

const ProfileSection: React.FC<{ profile: ProfileProps }> = ({ profile }) => {
  // ✅ URL에서 pinId 추출
  const pathname = usePathname();
  const pinId = pathname.split('/').pop(); // 마지막 경로(segment) 추출

  const [isliked, setIsliked] = useState(profile.isLiked);
  const [countlike, setCountlike] = useState(profile.countLike);

  const [owner, setOwner] = useState<any | null>(null);


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

  // 본인 여부 boolean으로 확인(프로필 경로 설정)
  useEffect(() => {
    const fetchPinData = async () => {
      const result = await checkPinUserId(pinId as string);

      if (Array.isArray(result)) {
        setOwner(result[0]); // ✅ 여러 개라면 첫 번째 요소 사용
      } else {
        setOwner(result); // ✅ 단일 객체라면 그대로 사용
      }
    };

    fetchPinData();
  }, [pinId]);

  return (
    <div className={styles.profileSection}>
      <Link className={styles.profile} href={owner?.isOwn ? 'profile' : `profile/${profile.userId}`}>
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
