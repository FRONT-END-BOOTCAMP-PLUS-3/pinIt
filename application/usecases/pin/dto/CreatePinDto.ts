type UUID = string;

export interface CreatePinDto {
  placeName: string;
  captureDate: Date;
  address: string;
  latitude: number;
  longitude: number;
  tags: string[];
  description: string;
  image: string;
  userId: UUID;
}
