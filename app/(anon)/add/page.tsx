'use client';

import { useEffect, useState } from 'react';
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

  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    address: string;
  } | null>(null);

  const handleLocationInputClick = (): void => {
    setIsLocationSearchVisible(true);
  };

  const handleCloseLocationSearch = (): void => {
    setIsLocationSearchVisible(false);
  };

  const handleSelectLocation = (location: {
    name: string;
    address: string;
  }) => {
    setSelectedLocation(location);
    setIsLocationSearchVisible(false);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // 폼 데이터 로직
  };

  // ✅ sessionStorage에서 장소 정보 가져오기
  useEffect(() => {
    const storedLocation = sessionStorage.getItem('selectedLocation');
    if (storedLocation) {
      setSelectedLocation(JSON.parse(storedLocation));
      sessionStorage.removeItem('selectedLocation'); // ✅ 사용 후 삭제
    }
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.pageTitle}>핀 생성</h2>
      <div className={styles.photoAndTextContainer}>
        <PhotoUpload />
        <TextArea />
      </div>
      <LocationInput
        onClick={handleLocationInputClick}
        selectedLocation={selectedLocation}
      />
      <DatePicker />
      <TagSelector />
      <div className={styles.saveButton}>
        <Button label='저장하기' onClickButton={handleSubmit} />
      </div>
      {isLocationSearchVisible && (
        <div className={styles['popup-overlay']}>
          <LocationSearch
            onClose={handleCloseLocationSearch}
            onSelectLocation={handleSelectLocation}
          />
        </div>
      )}
    </form>
  );
};

export default AddPage;
