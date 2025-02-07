'use client';

import MyPinList from "./_components/MyPinList";
import ProfileSummary from "./_components/ProfileSummary";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { useEffect, useState } from "react";
import { UserDto } from '@/application/usecases/admin/user/dto/UserDto';

export default function Profile() {
    /* 프로필 받아오기 시작 */
    const [userProfile, setUserProfile] = useState<UserDto | null>();
    const [userId, setUserId] = useState<string>("");
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            const response: Response = await fetch('/api/show-my-profile', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
        
            if (!response.ok) {
                setUserProfile(null);
                throw new Error('회원 프로필 요청 실패');
            }
        
            const result = await response.json();
            setUserProfile(result);
            setUserId(result.id);
        };
        fetchUserProfile();
    }, [userId]);
    /* 프로필 받아오기 끝 */
    
    const router = useRouter(); // onClick 또는 onClickEvent를 통한 페이지 이동에 필요

    return (
        <>
        <ProfileSummary
            identified={true}
            id={userProfile?.id as string}
            nickname={userProfile?.nickname as string}
            email={userProfile?.email as string}
            profileImage={userProfile?.profileImg as string}
            onClick={() => {
                router.push(ROUTES.profile.edit); // RouteConfig로 설정된 edit페이지를 Router를 통해 이동
            }}
        />
        <MyPinList userId={userId} />
        </>
    );
}