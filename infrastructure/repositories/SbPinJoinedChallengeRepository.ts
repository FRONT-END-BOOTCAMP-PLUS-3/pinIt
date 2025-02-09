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

  async createPinJoinedChallenge(data: PinJoinedChallenge[]): Promise<void> {
    const supabase = await createClient();

    const formattedData = data.map((item) => ({
      challengeTopic_id: item.challengeTopicId,
      pin_id: item.pinId,
    }));

    const { error } = await supabase
      .from('pin_joined_challenge')
      .insert(formattedData);

    if (error) {
      throw new Error(`데이터 삽입 오류: ${error.message}`);
    }
  }

  async deletePinJoinedChallenges(pinIds: string[]): Promise<void> {
    const supabase = await createClient();

    if (!pinIds.length) return;

    const { error } = await supabase
      .from('pin_joined_challenge')
      .delete()
      .in('pin_id', pinIds);

    if (error) {
      throw new Error(`데이터 삭제 오류: ${error.message}`);
    }
  }
}
