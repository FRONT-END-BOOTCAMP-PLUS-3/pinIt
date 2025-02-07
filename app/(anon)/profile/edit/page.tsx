'use client';

import { useEffect, useState } from "react";
import NicknameInput from "../_components/NicknameInput";
import ProfileImageEdit from "../_components/ProfileImageEdit";
import Button from "@/components/Buttons/Button";
import styles from "./edit.module.scss";
import React from "react";
import { UserDto } from "@/application/usecases/admin/user/dto/UserDto";

const ProfileEdit = () => {
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

    /* .container를 position:relative; (버튼 하단 고정에 필요) */
    useEffect(() => {
        const container = document.querySelector('.container');
        if (container) {
            (container as HTMLElement).style.position = 'relative';
        }
    }, []);

    const handleButtonLogout = (event: React.FormEvent): void => {
        event.preventDefault();
        // 폼 데이터 처리 로직 작성
        console.log('Logout finished.');
    };

    const handleButtonWithdrawal = (event: React.FormEvent): void => {
        event.preventDefault();
        // 폼 데이터 처리 로직 작성
        console.log('Withdrawal finished.');
    };

    return (
        <React.Fragment>
            <div className="profile_image_wrap">
                <ProfileImageEdit backgroundImage={userProfile?.profileImg as string} />
            </div>
            <NicknameInput />
            <div className={styles.button_area}>
                <div className={styles.button}>
                    <Button label='로그아웃' whiteColor={true} onClickButton={handleButtonLogout} />
                </div>
                <div className={styles.button}>
                    <Button label='회원 탈퇴' border={false} onClickButton={handleButtonWithdrawal} />
                </div>
            </div>
        </React.Fragment>
    );
}
export default ProfileEdit;