export const searchPinByUser = async (keyword: string) => {
  try {
    const response = await fetch(
      `/api/search/user?name=${encodeURIComponent(keyword)}`,
    );
    const result = await response.json();

    if (result.success) {
      return result.data.map((user: any) => ({
        id: user.id,
        nickname: user.nickname,
        profileImg: user.profileImg || '/default_profile.png', // 기본 이미지 설정
      }));
    } else {
      throw new Error(result.message || 'Failed to fetch users');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
