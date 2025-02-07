export interface PinDetail {
  image: string;
  nickname: string;
  userId: string;
  profileImg: string;
  isLiked: boolean;
  countLike: number;
  placeName: string;
  captureDate: Date;
  description: string;
  tags: string[];
  address: string;
  latitude: number;
  longitude: number;
  hasPermission: boolean;
}
