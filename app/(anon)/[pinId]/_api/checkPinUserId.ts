interface CheckPinUserIdDto {
  isOwn: boolean;
  error?: string;
}

export const checkPinUserId = async (pinId: string): Promise<CheckPinUserIdDto> => {
  try {
    if (!pinId) {
      console.error("🚨 checkPinUserId 호출 오류: pinId가 제공되지 않음");
      return { isOwn: false, error: "pinId가 제공되지 않았습니다." };
    }
    
    const response = await fetch('/api/check-pin-user-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinId }),
    });

    if (!response.ok) {
      const errorMessage = `🚨 서버 오류: ${response.status} (${response.statusText})`;
      console.error(errorMessage);
      return { isOwn: false, error: errorMessage };
    }

    const result: CheckPinUserIdDto = await response.json();
    return result;
  } catch (error) {
    console.error("🚨 핀 소유자 확인 API 호출 오류:", error);
    return { isOwn: false, error: "서버 오류 발생" };
  }
}