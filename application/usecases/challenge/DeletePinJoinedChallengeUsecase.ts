import { PinJoinedChallengeRepository } from '@/domain/repositories/PinJoinedChallengeRepository';

export const DeletePinJoinedChallengeUsecase = async (
  PinJoinedChallengedRepository: PinJoinedChallengeRepository,
  pinIds: string[],
): Promise<void> => {
  await PinJoinedChallengedRepository.deletePinJoinedChallenges(pinIds);
  return;
};
