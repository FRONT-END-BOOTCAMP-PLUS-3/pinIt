'use client';

import Icon from "@/components/Icon/Icon";
import styles from "./ProfileImageEdit.module.scss";
import { useRef } from "react";

const ProfileImageEdit = ({onChange, backgroundImage} : {onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; backgroundImage?: string}) => {
    // input[type="file"] 요소에 대한 참조를 저장
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 클릭 이벤트 핸들러
    const handleChange = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    
    return (
        <div className={styles.profile_image} onClick={handleChange}>
            {/* <Link className={styles.profile_image_edit} href={""}><Icon id={"setting-bold"} /></Link> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={backgroundImage || "/default-profile-img.jpg"}  alt="미리보기" className={styles.previewImage} />
            <span className={styles.profile_image_edit}><Icon id={"setting-bold"} /></span>
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={onChange}
            />
        </div>
    );
}

export default ProfileImageEdit;