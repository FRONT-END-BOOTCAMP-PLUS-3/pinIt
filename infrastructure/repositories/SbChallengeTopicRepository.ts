import { ChallengeTopic } from '@/domain/entities/ChallengeTopic';
import { ChallengeTopicRepository } from '@/domain/repositories/ChallengeTopicRepository';
import { createClient } from '@/utils/supabase/server';

export class SbChallengeTopicRepository implements ChallengeTopicRepository {
  async findAll(): Promise<ChallengeTopic[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('challenge_topic')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    const formattedData = data.map((challengeTopic) => ({
      id: challengeTopic.id,
      topic: challengeTopic.topic,
      createAt: challengeTopic.create_at,
      startDate: challengeTopic.start_date,
      endDate: challengeTopic.end_date,
      adminId: challengeTopic.admin_id,
    }));
    return formattedData || [];
  }

  async findThisWeekChallengeTopic(): Promise<ChallengeTopic | null> {
    const supabase = await createClient();
    const today = new Date().getTime();

    const { data, error } = await supabase.from('challenge_topic').select('*');
    // .lte('end_date', today) // end_date <= today
    // .gte('start_date', today) // start_date >= today
    // .order('start_date', { ascending: false })
    // .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    const formattedData = data.map((challengeTopics) => ({
      id: challengeTopics.id,
      topic: challengeTopics.topic,
      createAt: challengeTopics.create_at,
      startDate: challengeTopics.start_date,
      endDate: challengeTopics.end_date,
      adminId: challengeTopics.admin_id,
    }));

    const ongoingChallenge = formattedData.find((data) => {
      const startTime = new Date(data.startDate).getTime();
      const endTime = new Date(data.endDate).getTime();
      return startTime <= today && today <= endTime;
    });

    return ongoingChallenge ?? null;
  }
}
