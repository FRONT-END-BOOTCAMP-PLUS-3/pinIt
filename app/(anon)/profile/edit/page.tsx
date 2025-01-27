'use client';

import { useEffect } from "react";
import NicknameInput from "../_components/NicknameInput";
import ProfileImageEdit from "../_components/ProfileImageEdit";
import Button from "@/components/Buttons/Button";
import styles from "./edit.module.scss";
import React from "react";

const ProfileEdit = () => {
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
                <ProfileImageEdit backgroundImage="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRnFnp8DEGmD6r7YLwUcnhw7G6S9sRB_H7FbuzMO_0RlErkXRmGBWZ-Y2R7ma_u-lA2dStJWeTGJSS9DXFxJJ9SdfHSugpvdi48WfVFJA" />
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