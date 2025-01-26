import Icon from "@/components/Icon/Icon";
import styles from "./ProfileImageEdit.module.scss";
import Link from "next/link";

const ProfileImageEdit = ({backgroundImage} : {backgroundImage?: string}) => {
    return (
        <div className="profile_image_wrap">
            <div className={styles.profile_image} style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}>
                <Link className={styles.profile_image_edit} href={""}><Icon id={"setting-bold"} /></Link>
            </div>
        </div>
    );
}

export default ProfileImageEdit;