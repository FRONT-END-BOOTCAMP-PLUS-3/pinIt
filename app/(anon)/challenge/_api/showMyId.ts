export const fetchMyId = async () => {
  const response = await fetch('/api/show-my-profile');

  if (!response.ok) {
    throw new Error('회원 정보를 불러올 수 없습니다.');
  }

  const result = await response.json();

  return result;
};
