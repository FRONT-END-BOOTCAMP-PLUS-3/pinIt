'use client';

import { useEffect, useRef, useState } from 'react';
import PhotoUpload from './_components/PhotoUpload';
import TextArea from './_components/TextArea';
import LocationInput from './_components/LocationInput';
import DatePicker from './_components/DatePicker';
import TagSelector from './_components/TagSelector';
import LocationSearch from './_components/LocationSearch';
import { uploadImageToStorage } from '@/utils/supabase/storage';
import styles from './pinForm.module.scss';
import Button from '../Buttons/Button';

interface PinFormProps {
  isEdit?: boolean;
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
  onSubmit: (formData: any) => void;
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
  const [isFormValid, setIsFormValid] = useState(false); // ✅ 폼 검증 상태 추가

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

  // ✅ 모든 입력값이 채워져 있는지 확인하는 useEffect
  useEffect(() => {
    const isValid = Boolean(
      (isEdit || imageFile) &&
        selectedLocation &&
        captureDate &&
        selectedTags.length > 0 &&
        description.trim(),
    );
    setIsFormValid(isValid);
  }, [
    selectedLocation,
    captureDate,
    selectedTags,
    description,
    imageFile,
    isEdit,
  ]);

  useEffect(() => {
    const storedLocation = sessionStorage.getItem('selectedLocation');
    if (storedLocation) {
      setSelectedLocation(JSON.parse(storedLocation));
      sessionStorage.removeItem('selectedLocation');
    }
  }, []);

  useEffect(() => {
    if (initialData) {
      setSelectedLocation({
        name: initialData.placeName,
        address: initialData.address,
        latitude: initialData.latitude,
        longitude: initialData.longitude,
      });
    }
  }, [initialData]); // initialData 변경 시 selectedLocation 업데이트

  // 저장하기 버튼 클릭 시,
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) return; // ✅ 폼이 유효하지 않으면 실행 X

    try {
      setLoading(true);
      let imageUrl = initialData?.image || '';

      if (imageFile) {
        imageUrl = await uploadImageToStorage(imageFile); // Supabase에 이미지 업로드 후 URL 반환
      }

      const pinData = {
        image: imageUrl,
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
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
        key={selectedLocation ? selectedLocation.name : 'default'}
        onClick={handleLocationInputClick}
        selectedLocation={selectedLocation}
      />
      <DatePicker
        onChange={(date) => setCaptureDate(date)}
        initialDate={isEdit ? initialData?.captureDate : undefined}
      />
      <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
      <div className={styles.saveButton}>
        <Button
          label={loading ? '저장 중...' : '저장하기'}
          onClickButton={handleSubmit}
          disabled={!isFormValid || loading}
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
