'use client';

import { useEffect, useState } from "react";
import NicknameInput from "../_components/NicknameInput";
import ProfileImageEdit from "../_components/ProfileImageEdit";
import Button from "@/components/Buttons/Button";
import styles from "./edit.module.scss";
import React from "react";
import { UserDto } from "@/application/usecases/admin/user/dto/UserDto";
import { updateMyAccount } from "../_api/updateMyAccount";
import Confirmation from "@/components/Confirmation/Confirmation";

const ProfileEdit = () => {
    // 확인 팝업
    const [submitPopupOpen, setSubmitPopupOpen] = useState(false);
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

    /* 프로필 이미지 업로드 시작 */
    // 이미지 파일을 저장할 imageFile setter 선언
    const [imageFile, setImageFile] = useState<File | null>(null);
    // 프로필 수정 페이지에서 수정된 이미지를 즉각적으로 보여주기 위한 currentImage setter 선언
    const [currentImage, setCurrentImage] = useState<string>('');

    // 비동기 데이터이므로 useEffect를 통해 프로필 이미지 주소를 받아온다.
    useEffect(() => {
        if (userProfile?.profileImg) {
            setCurrentImage(userProfile.profileImg);
        }
    }, [userProfile?.profileImg]);

    // 이미지 파일 로드 & 표시
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            setIsFormValid(true);
        }
    };
    /* 프로필 이미지 업로드 끝 */

    /* 폼 데이터 전송 시작 */
    // 폼 값 유효 확인
    const [isFormValid, setIsFormValid] = useState(false); // ✅ 폼 검증 상태 추가
    // 유저 네임 비동기 데이터 저장을 위해 setter 사용
    const [nickname, setNickname] = useState(userProfile?.nickname || '');
    // nickname 값이 변경될 때마다 isFormValid 업데이트
    useEffect(() => {
        setIsFormValid(!!nickname.trim()); // 공백 제외 후 값이 있으면 true
    }, [userProfile?.nickname, nickname]);

    // 삭제 확인 모달 열기
    const handleSubmit = () => {
        setSubmitPopupOpen(true);
    };

    const handleConfirmSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      // 폼 데이터 처리 로직 작성
      if (!isFormValid) return; // ✅ 폼이 유효하지 않으면 실행 X
    //   console.log('Form submitted');
      try {
        if (nickname && imageFile) {
          await updateMyAccount(userId, nickname, imageFile);
        } else if (nickname && !imageFile) {
          await updateMyAccount(userId, nickname, null);
        } else if (!nickname && imageFile) {
          await updateMyAccount(userId, null, imageFile);
        }
        // 새로고침(전체 페이지)
        window.location.reload();
        // console.log("Form submitted successfully.");
      } catch (error) {
        console.error("Error updating user account:", error);
      }
    };
    /* 폼 데이터 전송 끝 */

    // .container를 position:relative; (버튼 하단 고정에 필요)
    useEffect(() => {
        const container = document.querySelector('.container');
        if (container) {
            (container as HTMLElement).style.position = 'relative';
        }
    }, []);

    // 로그아웃
    const handleButtonLogout = (event: React.FormEvent): void => {
        event.preventDefault();
        // 폼 데이터 처리 로직 작성
        console.log('Logout finished.');
    };

    // 탈퇴
    const handleButtonWithdrawal = (event: React.FormEvent): void => {
        event.preventDefault();
        // 폼 데이터 처리 로직 작성
        console.log('Withdrawal finished.');
    };

    return (
        <React.Fragment>
            {/* submitPopupOpen이 true일 때만 Confirmation 표시 */}
            {submitPopupOpen && (
                <Confirmation
                text='정말 수정하시겠습니까?'
                opened={submitPopupOpen}
                onClickConfirmation={handleConfirmSubmit}
                modalClose={() => setSubmitPopupOpen(false)}
                />
            )}
            <div className="profile_image_wrap">
                <ProfileImageEdit backgroundImage={currentImage}  onChange={handleImageUpload} />
            </div>
            <NicknameInput value={userProfile?.nickname} onChange={setNickname} />
            <div className={styles.button_save}>
                <Button label='저장' onClickButton={handleSubmit} disabled={!isFormValid} />
            </div>
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