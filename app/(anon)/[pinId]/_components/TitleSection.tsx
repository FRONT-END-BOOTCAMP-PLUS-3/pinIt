'use client';

import styles from '../pinDetail.module.scss';
interface TitleProps {
  placeName: string;
  captureDate: string;
  description: string;
  tags: string[];
}
const TitleSection: React.FC<{ title: TitleProps }> = ({ title }) => {
  const formattedDate = title.captureDate.split('T')[0]; // YYYY-MM-DD 형식으로 변환

  return (
    <div className={styles.titleSection}>
      <h2 className={styles.pinTitle}>「{title.placeName}」</h2>
      <p className={styles.pinDate}>📸 {formattedDate}</p>
      <p className={styles.pinContent}>{title.description}</p>
      <div className={styles.tags}>
        {title.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
export default TitleSection;
