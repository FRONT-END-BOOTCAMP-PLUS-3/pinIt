export interface UpdatePinDto {
  id: string;
  placeName: string;
  captureDate: Date;
  address: string;
  latitude: number;
  longitude: number;
  tags: string[];
  description: string;
  image: string;
}
