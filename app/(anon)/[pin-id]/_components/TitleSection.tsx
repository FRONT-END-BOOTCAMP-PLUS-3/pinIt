import styles from '../pinDetail.module.scss';

const TitleSection: React.FC = () => {
  return (
    <div className={styles.titleSection}>
      <h2 className={styles.pinTitle}>「남산타워」</h2>
      <p className={styles.pinDate}>2025-10-23</p>
      <p className={styles.pinContent}>
        눈 덮힌 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다요 다들
        여기서 사진 찍으시길~!! 눈 덮힌 남산타워에 다녀왔어요! 여기 팔각정 앞이
        바로 포토존입니다요 다들 여기서 사진 찍으시길~!! 눈 덮힌 남산타워에
        다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다요 다들 여기서 사진
        찍으시길~!! 눈 덮힌 남산타워에 다녀왔어요! 여기 팔각정 앞이 바로
        포토존입니다요 다들 여기서 사진 찍으시길~!! 눈 덮힌 남산타워에
        다녀왔어요! 여기 팔각정 앞이 바로 포토존입니다요 다들 여기서 사진
        찍으시길~!!
      </p>
      <div className={styles.tags}>
        <span className={styles.tag}>야경</span>
        <span className={styles.tag}>눈</span>
      </div>
    </div>
  );
};
export default TitleSection;
