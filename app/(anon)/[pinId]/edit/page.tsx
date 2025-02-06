'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PinForm from '@/components/PinForm/PinForm';
import { updatePin } from './_api/updatePin';
import { CreatePinDto } from '@/application/usecases/pin/dto/CreatePinDto';

const PinEditPage: React.FC = () => {
  const params = useParams();
  const pinId = params?.pinId as string;
  const [pinData, setPinData] = useState<CreatePinDto | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPin = async () => {
      const response = await fetch(`/api/pin-detail/${pinId}`);
      const data = await response.json();
      setPinData({
        image: data.image,
        placeName: data.placeName,
        address: data.address,
        captureDate: data.captureDate,
        description: data.description,
        tags: data.tags,
        latitude: data.latitude,
        longitude: data.longitude,
      });
    };
    fetchPin();
  }, [pinId]);

  // 저장하기 버튼 클릭 시, 성공한다면
  const handleUpdatePin = async (formData: any) => {
    await updatePin(pinId, formData); // 받아온 formData를 updatePin에 전달
    alert('✅ 핀이 성공적으로 수정되었습니다.');
    router.back(); // 이전 페이지로 이동
  };

  if (!pinData) return <p>로딩 중...</p>;

  return (
    <PinForm isEdit={true} initialData={pinData} onSubmit={handleUpdatePin} />
  );
};

export default PinEditPage;
