export interface PinDto {
  userId: string,
  userName: string,
  userEmail: string,
  id: string,
  placeName: string,
  address: string, // 두 단어만 유지
  image: string,
  isLiked: boolean,
  countLike: number | 0;
}
