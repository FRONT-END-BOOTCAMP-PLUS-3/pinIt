export const deletePin = async (pinId: string): Promise<void> => {
  if (!pinId) {
    throw new Error('pinId가 필요합니다.');
  }

  const response: Response = await fetch(`/api/delete-pin/${pinId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('❌ 핀 삭제 요청 실패');
  }
};
