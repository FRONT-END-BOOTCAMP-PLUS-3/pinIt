export const deleteCheckedItems = async (checkedItems: string[]) => {
  if (checkedItems.length === 0) return; // ✅ 빈 배열이면 실행 안 함

  try {
    const response = await fetch('/api/admin-delete-pin', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkedItems }),
    });

    const data = await response.json();
    console.log(data.message); // 성공 메시지 확인
  } catch (error) {
    console.error('삭제 실패:', error);
  }
};
