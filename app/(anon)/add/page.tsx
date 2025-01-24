'use client';

import { useState } from 'react';
import PhotoUpload from './_components/PhotoUpload';
import TextArea from './_components/TextArea';
import LocationInput from './_components/LocationInput';
import DatePicker from './_components/DatePicker';
import TagSelector from './_components/TagSelector';
import Button from '@/components/Buttons/Button';
import LocationSearch from './_components/LocationSearch';
import styles from './add.module.scss';

const AddPage: React.FC = () => {
  const [isLocationSearchVisible, setIsLocationSearchVisible] = useState(false);

  const handleLocationInputClick = (): void => {
    setIsLocationSearchVisible(true);
  };

  const handleCloseLocationSearch = (): void => {
    setIsLocationSearchVisible(false);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // 폼 데이터 처리 로직 작성
    console.log('Form submitted');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.pageTitle}>핀 생성</h2>
      <div className={styles.photoAndTextContainer}>
        <PhotoUpload />
        <TextArea />
      </div>
      <LocationInput onClick={handleLocationInputClick} />
      <DatePicker />
      <TagSelector />
      <div className={styles.saveButton}>
        <Button label='저장하기' onClickButton={handleSubmit} />
      </div>
      {isLocationSearchVisible && (
        <div className={styles['popup-overlay']}>
          <LocationSearch onClose={handleCloseLocationSearch} />
        </div>
      )}
    </form>
  );
};

export default AddPage;
