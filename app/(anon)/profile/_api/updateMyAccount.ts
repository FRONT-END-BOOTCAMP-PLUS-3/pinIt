import { uploadProfileImageToStorage } from "@/utils/supabase/storage";

export const updateMyAccount = async (userId: string, nickname?: string | null, imageFile?: File | null) => {
  const formData = new FormData();

  formData.append("id", userId);

  if (nickname) {
    formData.append("nickname", nickname);
  }

  let imageUrl: string | null = null;
  if (imageFile) {
    try {
      imageUrl = await uploadProfileImageToStorage(imageFile); // 이미지 업로드 후 URL 생성
      formData.append("imageUrl", imageUrl); // 서버에 imageUrl 전송
    } catch (error) {
      console.error("🚨 이미지 업로드 실패:", error);
      throw new Error("이미지 업로드 실패");
    }
  }

  formData.forEach((value, key) => {
    console.log(key, value);
  });

  const response: Response = await fetch('/api/update-my-account', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  console.log(response.status, result);
  if (!response.ok) {
    throw new Error(result.error || '유저 정보 업데이트 실패');
  }

  return result;
}