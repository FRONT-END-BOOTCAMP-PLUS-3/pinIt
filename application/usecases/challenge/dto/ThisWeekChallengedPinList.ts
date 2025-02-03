import { PinDto } from '../../pin/dto/PinDto';
import { ChallengeTopicDto } from './ChallengeTopicDto';

export interface CreatePinDto {
  ChallengedPins: PinDto[];
  ChallengeTopics: ChallengeTopicDto[];

  placeName: string;
  captureDate: Date;
  address: string;
  latitude: number;
  longitude: number;
  tags: string[];
  description: string;
  image: string;
}
