import Icon from "@/components/Icon/Icon";
import ProfileImage from "./ProfileImage";
import styles from "./ProfileSummary.module.scss";

type ProfileSummaryProps =
    | { identified: true; onClick: () => void; id: string; nickname: string; email: string; profileImage?: string; deleted?: boolean; }  // identified가 true일 때 onClick이 필수
    | { identified?: false; onClick?: never; id: string; nickname: string; email: string; profileImage?: string; deleted?: boolean; };  // identified가 false일 때 onClick은 선택

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ identified = false, onClick, id, nickname, email, profileImage, deleted }) => {
    return (
        <div className={`${styles.profile_summary}${deleted ? ' '+styles.disabled : ''}`}>
            <ProfileImage backgroundImage={deleted ? '/default-profile-img.jpg' : profileImage} />
            <div className={styles.user_info}>
                {identified && onClick && (
                <div className={styles.name} onClick={onClick} style={{cursor:'pointer'}}>
                    <h1>{nickname}</h1>
                    <Icon id={"right"} width={18} height={18} color={"#292526"} />
                </div>
                )}
                {!identified && (
                <div className={styles.name}>
                    <h1>{deleted ? "탈퇴된 사용자입니다." : nickname}</h1>
                </div>
                )}
                {!deleted && <span className={styles.email}>{email}</span>} {/* deleted가 true이면 이메일 숨김 */}
            </div>
        </div>
    );
}

export default ProfileSummary;