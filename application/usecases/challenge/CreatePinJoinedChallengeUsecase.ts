import { PinJoinedChallengeRepository } from '@/domain/repositories/PinJoinedChallengeRepository';
import { CreatePinJoinedChallengeDto } from './dto/CreatePinJoinedChallenge';
import { PinJoinedChallenge } from '@/domain/entities/PinJoinedChallenge';

export const createPinJoinedChallengeUsecase = async (
  pinJoinedChallengeRepository: PinJoinedChallengeRepository,
  data: CreatePinJoinedChallengeDto[],
): Promise<void> => {
  // Dto를 인자로 받았고, 레포지토리에는 Pin엔티티의 형태로 전송해줘야 하기 때문에 변환해주기
  // 없는건 걍 null로 보내주면 됨
  const newData: PinJoinedChallenge[] = data.map((item) => ({
    challengeTopicId: item.challengeTopicId,
    pinId: item.pinId,
  }));

  await pinJoinedChallengeRepository.createPinJoinedChallenge(newData);
};
