'use client';

import PinForm from '@/components/PinForm/PinForm';
import { createPin } from './_api/creatPin';

const AddPage = () => {
  const handleCreatePin = async (formData: any) => {
    await createPin(formData);
    alert('✅ 핀이 성공적으로 생성되었습니다.');
    window.location.href = '/';
  };

  return <PinForm isEdit={false} onSubmit={handleCreatePin} />;
};

export default AddPage;
