'use client';

import { useEffect, useRef, useState } from 'react';
import PhotoUpload from './_components/PhotoUpload';
import TextArea from './_components/TextArea';
import LocationInput from './_components/LocationInput';
import DatePicker from './_components/DatePicker';
import TagSelector from './_components/TagSelector';
import Button from '@/components/Buttons/Button';
import LocationSearch from './_components/LocationSearch';
import { uploadImageToStorage } from '@/utils/supabase/storage';
import styles from './pinForm.module.scss';

interface PinFormProps {
  isEdit?: boolean;
  // isEdit가 true이면 initialData도 같이 추가로 넣어주고,
  // IsEdit가 false이면 initialData는 필요 없음
  initialData?: {
    image: string;
    placeName: string;
    address: string;
    captureDate: Date;
    description: string;
    tags: string[];
    latitude: number;
    longitude: number;
  };
  onSubmit: (formData: any) => void; // 저장하기 버튼 누를 시, 발생되는 이벤트 핸들러
}

const PinForm: React.FC<PinFormProps> = ({
  isEdit = false,
  initialData,
  onSubmit,
}) => {
  const [isLocationSearchVisible, setIsLocationSearchVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    initialData
      ? {
          name: initialData.placeName,
          address: initialData.address,
          latitude: initialData.latitude,
          longitude: initialData.longitude,
        }
      : null,
  );
  const [captureDate, setCaptureDate] = useState<Date>(
    initialData ? new Date(initialData.captureDate) : new Date(),
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags || [],
  );
  const [description, setDescription] = useState(
    initialData?.description || '',
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 이미지 초기화 용도
  const photoUploadRef = useRef<{ resetImage: () => void } | null>(null);

  const handleLocationInputClick = () => setIsLocationSearchVisible(true);
  const handleCloseLocationSearch = () => setIsLocationSearchVisible(false);

  const handleSelectLocation = (location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }) => {
    setSelectedLocation(location);
    setIsLocationSearchVisible(false);
  };

  useEffect(() => {
    const storedLocation = sessionStorage.getItem('selectedLocation');
    if (storedLocation) {
      setSelectedLocation(JSON.parse(storedLocation));
      sessionStorage.removeItem('selectedLocation');
    }
  }, []);

  // 저장하기 버튼 클릭 시,
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      selectedLocation &&
      captureDate &&
      selectedTags &&
      description &&
      imageFile &&
      loading
    ) {
      alert('모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      let imageUrl = initialData?.image || '';

      if (imageFile) {
        imageUrl = await uploadImageToStorage(imageFile); // Supabase에 이미지 업로드 후 URL 반환
      }

      const pinData = {
        image: imageUrl, // 업로드된 이미지 URL 사용
        description,
        placeName: selectedLocation?.name || '',
        address: selectedLocation?.address || '',
        captureDate,
        tags: selectedTags,
        latitude: selectedLocation?.latitude || 0,
        longitude: selectedLocation?.longitude || 0,
      };

      onSubmit(pinData);
    } catch (error) {
      console.error('핀 저장 실패:', error);
      alert(
        isEdit ? '🚨 핀 수정에 실패했습니다.' : '🚨 핀 생성에 실패했습니다.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.pageTitle}>{isEdit ? '핀 수정' : '핀 생성'}</h2>
      <div className={styles.photoAndTextContainer}>
        <PhotoUpload
          ref={photoUploadRef}
          onUpload={setImageFile}
          initialImage={isEdit ? initialData?.image : undefined}
        />
        <TextArea value={description} onChange={setDescription} />
      </div>
      <LocationInput
        onClick={handleLocationInputClick}
        selectedLocation={selectedLocation}
      />
      <DatePicker
        onChange={(date) => setCaptureDate(date)}
        initialDate={isEdit ? initialData?.captureDate : undefined}
      />{' '}
      <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
      <div className={styles.saveButton}>
        <Button
          label={loading ? '저장 중...' : '저장하기'}
          onClickButton={handleSubmit}
        />
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

export default PinForm;
