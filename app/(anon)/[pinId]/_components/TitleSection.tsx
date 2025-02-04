'use client';

import { useState } from 'react';
import Icon from '@/components/Icon/Icon';
import styles from '../pinDetail.module.scss';

interface TitleProps {
  placeName: string;
  captureDate: string;
  description: string;
  tags: string[];
  hasPermission: boolean;
}

const TitleSection: React.FC<{ title: TitleProps }> = ({ title }) => {
  const formattedDate = title.captureDate.split('T')[0]; // YYYY-MM-DD 형식으로 변환
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className={styles.titleSection}>
      <div className={styles.titleContainer}>
        <h2 className={styles.pinTitle}>「{title.placeName}」</h2>
        {title.hasPermission && (
          <div className={styles.menuWrapper}>
            <span className={styles.menu} onClick={toggleMenu}>
              <Icon id='more' color='#292526' />
            </span>
            {isMenuOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.menuItem}>
                  <Icon id='write' width={20} color='#292526' /> 편집
                </button>
                <button className={styles.menuItem}>
                  <Icon id='trash' width={20} color='#292526' /> 삭제
                </button>
              </div>
            )}
          </div>
        )}
      </div>
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
