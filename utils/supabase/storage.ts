import { browserClient } from '@/utils/supabase/client';

export const uploadImageToStorage = async (file: File): Promise<string> => {
  const supabase = await browserClient();
  const filePath = `uploads/${Date.now()}_${file.name.split('.').pop()}`; // ✅ 고유한 파일명 생성

  try {
    const { data, error } = await supabase.storage
      .from('pin') // ✅ 'pin' 버킷에 업로드
      .upload(filePath, file);

    if (error) throw error;

    // ✅ 업로드된 파일의 public URL 가져오기
    const { data: publicUrlData } = supabase.storage
      .from('pin')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('🚨 이미지 업로드 실패:', error);
    throw new Error('이미지 업로드 실패');
  }
};
