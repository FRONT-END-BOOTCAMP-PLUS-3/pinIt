import styles from "./ProfileImage.module.scss";

const ProfileImage = ({backgroundImage} : {backgroundImage?: string}) => {
    return (
        <div className={styles.profile_image} style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}></div>
    );
}

export default ProfileImage;