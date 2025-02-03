type UUID = string;

export interface CreatePin {
  image: string;
  description: string;
  placeName: string;
  address: string;
  captureDate: Date;
  tags: string[];
  latitude: number;
  longitude: number;
  userId: UUID;
}
