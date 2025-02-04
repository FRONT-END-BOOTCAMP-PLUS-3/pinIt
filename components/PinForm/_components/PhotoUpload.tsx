'use client';

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import styles from '../pinForm.module.scss';

interface PhotoUploadProps {
  onUpload: (file: File | null) => void;
  initialImage?: string; // ✅ 기존 이미지 URL
}

// forwardRef를 이용해 부모에서 ref를 통해 이미지 초기화할 수 있도록 설정
const PhotoUpload = forwardRef(
  ({ onUpload, initialImage }: PhotoUploadProps, ref) => {
    const [previewImage, setPreviewImage] = useState<string>(
      initialImage || '',
    ); // ✅ 초기값 설정

    useEffect(() => {
      if (initialImage) {
        setPreviewImage(initialImage);
      }
    }, [initialImage]);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files[0]) {
        const file = files[0];
        onUpload(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    // 부모에서 호출할 수 있도록 이미지 초기화 함수 제공
    useImperativeHandle(ref, () => ({
      resetImage: () => {
        setPreviewImage(initialImage || '');
        onUpload(null);
      },
    }));

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
  },
);

PhotoUpload.displayName = 'PhotoUpload';

export default PhotoUpload;
