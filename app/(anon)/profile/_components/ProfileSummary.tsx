import Icon from "@/components/Icon/Icon";
import ProfileImage from "./ProfileImage";
import styles from "./ProfileSummary.module.scss";
import Link from "next/link";

const ProfileSummary = () => {
    return (
        <div className={styles.profile_summary}>
            <ProfileImage />
            <div className={styles.user_info}>
                <Link className={styles.name} href={`/profile/edit`}>
                    <h1>하이롱</h1>
                    <Icon id={"right"} width={18} height={18} color={"#292526"} />
                </Link>
                <span className={styles.email}>id@email.com</span>
            </div>
        </div>
    );
}

export default ProfileSummary;