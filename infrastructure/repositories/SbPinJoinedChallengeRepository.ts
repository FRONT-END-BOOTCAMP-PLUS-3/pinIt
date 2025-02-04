import { PinJoinedChallenge } from '@/domain/entities/PinJoinedChallenge';
import { PinJoinedChallengeRepository } from '@/domain/repositories/PinJoinedChallengeRepository';
import { createClient } from '@/utils/supabase/server';

export class SbPinJoinedChallengeRepository
  implements PinJoinedChallengeRepository
{
  async findPindsByChallengeTopicId(
    challengeTopicId: string | null,
  ): Promise<PinJoinedChallenge[]> {
    if (!challengeTopicId) return [];

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('pin_joined_challenge')
      .select('*')
      .eq('challengeTopic_id', challengeTopicId);

    if (error) {
      throw new Error(error.message);
    }

    const formattedData = data.map((pinJoinedChallenge) => ({
      challengeTopicId: pinJoinedChallenge.challengeTopic_id,
      pinId: pinJoinedChallenge.pin_id,
    }));

    return formattedData || [];
  }
}
