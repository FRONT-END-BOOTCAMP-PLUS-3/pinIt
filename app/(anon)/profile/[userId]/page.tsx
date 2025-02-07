'use client';

import React, { useEffect, useState } from 'react';
import UserPinList from '../_components/UserPinList';
import ProfileSummary from "../_components/ProfileSummary";
import { UserDto } from '@/application/usecases/admin/user/dto/UserDto';
import { useParams } from 'next/navigation';

const UserProfile: React.FC = () => {
    /* 프로필 받아오기 시작 */
    const params = useParams();
    const userId = params.userId as string; // Type assertion을 이용해 string으로 변환
    
    const [userProfile, setUserProfile] = useState<UserDto | null>();

    useEffect(() => {
      const fetchUserProfile = async () => {
        const response: Response = await fetch('/api/show-user-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userId }),
        });
    
        if (!response.ok) {
          setUserProfile(null);
          throw new Error('회원 프로필 요청 실패');
        }
    
        const result = await response.json();
        setUserProfile(result);
      };
    
      fetchUserProfile();
    }, [userId]);
    /* 프로필 받아오기 끝 */

    return (
        <>
        <ProfileSummary
            id={userProfile?.id as string}
            nickname={userProfile?.nickname as string}
            email={userProfile?.email as string}
            profileImage={userProfile?.profileImg as string}
        />
        <UserPinList userId={userId} userName={userProfile?.nickname} />
        </>
    );
}

export default UserProfile;