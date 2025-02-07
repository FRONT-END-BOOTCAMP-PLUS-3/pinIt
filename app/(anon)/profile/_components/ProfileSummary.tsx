import Icon from "@/components/Icon/Icon";
import ProfileImage from "./ProfileImage";
import styles from "./ProfileSummary.module.scss";

type ProfileSummaryProps =
    | { identified: true; onClick: () => void; id: string; nickname: string; email: string; profileImage?: string; }  // identified가 true일 때 onClick이 필수
    | { identified?: false; onClick?: never; id: string; nickname: string; email: string; profileImage?: string; };  // identified가 false일 때 onClick은 선택

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ identified = false, onClick, id, nickname, email, profileImage }) => {
    return (
        <div className={styles.profile_summary}>
            <ProfileImage backgroundImage={profileImage} />
            <div className={styles.user_info}>
                {identified && onClick && (
                <div className={styles.name} onClick={onClick} style={{cursor:'pointer'}}>
                    <h1>{nickname}</h1>
                    <Icon id={"right"} width={18} height={18} color={"#292526"} />
                </div>
                )}
                {!identified && (
                <div className={styles.name}>
                    <h1>{nickname}</h1>
                </div>
                )}
                <span className={styles.email}>{email}</span>
            </div>
        </div>
    );
}

export default ProfileSummary;