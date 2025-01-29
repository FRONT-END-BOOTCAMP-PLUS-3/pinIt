'use client';

import React, { useState } from 'react';
import styles from '../add.module.scss';

const PhotoUpload: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      console.log('Uploaded file:', file);

      // 이미지 미리보기 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className={styles.photoUploadContainer}>
        <label htmlFor='photo-upload' className={styles.uploadLabel}>
          {previewImage ? (
            <img
              src={previewImage}
              alt='미리보기'
              className={styles.previewImage}
            />
          ) : (
            <div className={styles.placeholder}>
              <span className={styles.plusIcon}>+</span>
              <span className={styles.text}>사진 추가</span>
              <span className={styles.count}>0/1</span>
            </div>
          )}
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
