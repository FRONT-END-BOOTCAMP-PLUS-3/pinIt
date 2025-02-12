export const deleteLike = async (id: string) => {
  const response: Response = await fetch('/api/delete-like-pin', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify({ id }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || '좋아요 삭제 실패');
  }

  return result;
};
