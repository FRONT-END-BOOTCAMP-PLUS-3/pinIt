import { ChallengeTopic } from '@/domain/entities/ChallengeTopic';
import { ChallengeTopicRepository } from '@/domain/repositories/ChallengeTopicRepository';
import { createClient } from '@/utils/supabase/server';

export class SbChallengeTopicRepository implements ChallengeTopicRepository {
  async findAll(): Promise<ChallengeTopic[]> {
    const supabase = await createClient();
    const { data: challengeTopics, error } = await supabase
      .from('challenge_topic')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }
    return challengeTopics as ChallengeTopic[];
  }

  async findThisWeekChallengeTopic(): Promise<ChallengeTopic | null> {
    const supabase = await createClient();
    const today = new Date().getTime();

    const { data: challengeTopics, error } = await supabase
      .from('challenge_topic')
      .select('*');
    // SQL 필터링 안댐 ㅜㅜ
    // .lte('end_date', today) // end_date <= today
    // .gte('start_date', today) // start_date >= today
    // .order('start_date', { ascending: false })
    // .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    const ongoingChallenge = challengeTopics.find((topic) => {
      const startTime = new Date(topic.start_date).getTime();
      const endTime = new Date(topic.end_date).getTime();
      return startTime <= today && today <= endTime;
    });

    return ongoingChallenge ?? null;
  }
}
