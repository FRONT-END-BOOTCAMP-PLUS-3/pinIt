import { PinJoinedChallengeRepository } from '@/domain/repositories/PinJoinedChallengeRepository';
import { createClient } from '@/utils/supabase/server';

export class SbPinJoinedChallengeRepository
  implements PinJoinedChallengeRepository
{
  async findPindsByChallengeTopicId(
    challengeTopicId: string,
  ): Promise<string[]> {
    const supabase = await createClient();
    const { data: pinsJoinedChallenge, error } = await supabase
      .from('pin_joined_challenge')
      .select('pin_id')
      .eq('challenge_topic_id', challengeTopicId);

    if (error) {
      throw new Error(error.message);
    }
    return pinsJoinedChallenge?.map((pin) => pin.pin_id) || [];
  }
}
