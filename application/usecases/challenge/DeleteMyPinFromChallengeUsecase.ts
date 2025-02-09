import { SbPinJoinedChallengeRepository } from '@/infrastructure/repositories/SbPinJoinedChallengeRepository';

export const DeleteMyPinFromChallengeUsecase = async (
  PinJoinedChallengedRepository: SbPinJoinedChallengeRepository,
  pinIds: string[],
): Promise<void> => {
  await PinJoinedChallengedRepository.deletePinJoinedChallenges(pinIds);
  return;
};
