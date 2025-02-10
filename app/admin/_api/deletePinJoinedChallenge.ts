export const deletePinJoinedChallenge = async (checkedItems: string[]) => {
  if (checkedItems.length === 0) return; // ✅ 빈 배열이면 실행 안 함

  const response = await fetch('/api/admin-delete-pin-joined-challenge', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(checkedItems),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || '삭제 요청 실패');
  }
};
