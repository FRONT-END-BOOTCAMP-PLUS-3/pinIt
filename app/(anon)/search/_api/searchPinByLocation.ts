export const searchPinByLocation = async (keyword: string) => {
  try {
    const response = await fetch(
      `/api/search/place?name=${encodeURIComponent(keyword)}`,
    );
    const result = await response.json();

    if (result.success) {
      return result.data.map((pin: any) => ({
        id: pin.id,
        url: pin.image || '/default_image.png',
        location: pin.placeName,
        address: pin.address,
        clicked: pin.isLiked,
      }));
    } else {
      throw new Error(result.message || 'Failed to fetch pins');
    }
  } catch (error) {
    console.error('Error fetching pins:', error);
    return [];
  }
};
