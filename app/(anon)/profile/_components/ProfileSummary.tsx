import Icon from "@/components/Icon/Icon";
import ProfileImage from "./ProfileImage";
import styles from "./ProfileSummary.module.scss";
import Link from "next/link";

const ProfileSummary = (
    {identified = false}: {identified?:boolean}) => {
        return (
            <div className={styles.profile_summary}>
                <ProfileImage backgroundImage="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRnFnp8DEGmD6r7YLwUcnhw7G6S9sRB_H7FbuzMO_0RlErkXRmGBWZ-Y2R7ma_u-lA2dStJWeTGJSS9DXFxJJ9SdfHSugpvdi48WfVFJA" />
                <div className={styles.user_info}>
                    {identified && (
                    <Link className={styles.name} href={`/profile/edit`}>
                        <h1>하이롱</h1>
                        <Icon id={"right"} width={18} height={18} color={"#292526"} />
                    </Link>
                    )}
                    {!identified && (
                    <div className={styles.name}>
                        <h1>하이롱</h1>
                    </div>
                    )}
                    <span className={styles.email}>id@email.com</span>
                </div>
            </div>
        );
}

export default ProfileSummary;