'use client';

import { useEffect, useRef, useState } from 'react';
import PhotoUpload from './_components/PhotoUpload';
import TextArea from './_components/TextArea';
import LocationInput from './_components/LocationInput';
import DatePicker from './_components/DatePicker';
import TagSelector from './_components/TagSelector';
import Button from '@/components/Buttons/Button';
import LocationSearch from './_components/LocationSearch';
import { createPin } from './_api/creatPin';
import styles from './add.module.scss';
import { uploadImageToStorage } from '@/utils/supabase/storage';

const AddPage: React.FC = () => {
  const [isLocationSearchVisible, setIsLocationSearchVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [captureDate, setCaptureDate] = useState<Date>(new Date()); // 촬영 날짜
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>(''); // 설명
  const [imageFile, setImageFile] = useState<File | null>(null); // 업로드할 파일 저장
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 추가

  // PhotoUpload의 resetImage 함수를 호출하기 위한 ref
  const photoUploadRef = useRef<{ resetImage: () => void } | null>(null);

  const handleLocationInputClick = (): void => {
    setIsLocationSearchVisible(true);
  };

  const handleCloseLocationSearch = (): void => {
    setIsLocationSearchVisible(false);
  };

  const handleSelectLocation = (location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  }) => {
    setSelectedLocation(location);
    setIsLocationSearchVisible(false);
  };

  // sessionStorage에서 장소 정보 가져오기
  useEffect(() => {
    const storedLocation = sessionStorage.getItem('selectedLocation');
    if (storedLocation) {
      setSelectedLocation(JSON.parse(storedLocation));
      sessionStorage.removeItem('selectedLocation'); // 사용 후 삭제
    }
  }, []);

  // 입력 폼 초기화 함수
  const resetForm = () => {
    setSelectedLocation(null);
    setCaptureDate(new Date());
    setSelectedTags([]);
    setDescription('');
    setImageFile(null);
    photoUploadRef.current?.resetImage(); // 이미지 미리보기까지 초기화
  };

  // "저장하기" 버튼 클릭 시 _api/createPin.ts 호출
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (!selectedLocation) {
      alert('장소를 선택해주세요.');
      return;
    }

    try {
      setLoading(true); // 로딩 시작

      let imageUrl = ''; // 기본적으로 빈 문자열

      // 이미지 업로드 처리
      if (imageFile) {
        imageUrl = await uploadImageToStorage(imageFile); // Supabase 업로드 후 URL 반환
      }

      const pinData = {
        image: imageUrl, // 업로드된 이미지 URL 사용
        description: description,
        placeName: selectedLocation.name,
        address: selectedLocation.address,
        captureDate: captureDate,
        tags: selectedTags,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      };

      console.log(pinData);
      const response = await createPin(pinData); // API 호출
      console.log('✅ 핀 생성 성공:', response);
      alert('핀 생성이 완료되었습니다!');

      // 성공적으로 생성되면 폼 리셋
      resetForm();
    } catch (error) {
      console.error('🚨 핀 생성 실패:', error);
      alert('핀 생성에 실패했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.pageTitle}>핀 생성</h2>
      <div className={styles.photoAndTextContainer}>
        {/* ref를 전달하여 부모에서 초기화 가능하도록 설정 */}
        <PhotoUpload ref={photoUploadRef} onUpload={setImageFile} />
        <TextArea value={description} onChange={setDescription} />
      </div>
      <LocationInput
        onClick={handleLocationInputClick}
        selectedLocation={selectedLocation}
      />
      <DatePicker onChange={(date) => setCaptureDate(date)} />
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

export default AddPage;
