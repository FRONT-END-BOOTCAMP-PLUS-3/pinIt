'use client';

import React from 'react';
import styles from '../add.module.scss';

const PhotoUpload: React.FC = () => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      console.log('Uploaded file:', files[0]);
    }
  };

  return (
    <div>
      <div className={styles.photoUploadContainer}>
        <label htmlFor='photo-upload' className={styles.uploadLabel}>
          <div className={styles.placeholder}>
            <span className={styles.plusIcon}>+</span>
            <span className={styles.text}>사진 추가</span>
            <span className={styles.count}>0/1</span>
          </div>
          <input
            id='photo-upload'
            type='file'
            accept='image/*'
            onChange={handleUpload}
            className={styles.hiddenInput}
          />
        </label>
      </div>
    </div>
  );
};

export default PhotoUpload;
