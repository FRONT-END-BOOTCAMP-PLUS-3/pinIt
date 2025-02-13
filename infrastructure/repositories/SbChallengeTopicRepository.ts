import { ChallengeTopic } from '@/domain/entities/ChallengeTopic';
import { ChallengeTopicRepository } from '@/domain/repositories/ChallengeTopicRepository';
import { createClient } from '@/utils/supabase/server';

export class SbChallengeTopicRepository implements ChallengeTopicRepository {
  async createChallengeTopic(data: ChallengeTopic): Promise<void> {
    const supabase = await createClient();
    
    // 입력받은 data를 DB에 저장하기 위해 스네이크케이스로 변환
    const formattedData = {
      topic: data.topic,
      start_date: data.startDate, // 시작 날짜
      end_date: data.endDate, // 종료 날짜
      admin_id: data.adminId, // 관리자 UUID (외래 키, Foreign Key)
    };
    // null로 받은 애들은 그냥 안보내줘도 됨 (안보내주면 DB에서 자동으로 기본값을 사용해서 저장함)

    const { error } = await supabase.from('challenge_topic').insert(formattedData).select();
    if (error) {
      throw new Error(error.message);
    }
  }

  async updateChallengeTopic(updateData: ChallengeTopic): Promise<void> {
    const supabase = await createClient();

    if (!updateData.id) {
      throw new Error('ID가 필요합니다.');
    }

    const formattedData = {
      topic: updateData.topic,
      start_date: updateData.startDate,
      end_date: updateData.endDate,
      admin_id: updateData.adminId,
    }

    console.log('Attempting to update challenge topic with ID:', updateData.id);  // 로그 추가
    console.log('Formatted data to be updated:', formattedData);  // formattedData 로그 추가

    // 먼저 해당 ID가 존재하는지 확인
    const { data: existingTopic, error: fetchError } = await supabase
        .from('challenge_topic')
        .select('id')
        .eq('id', updateData.id)
        .single();  // 단일 레코드 반환

    if (fetchError) {
        console.error('Error fetching data:', fetchError);
        throw new Error('ID가 존재하지 않거나 가져올 수 없습니다.');
    }

    if (!existingTopic) {
        console.log('No record found with the given ID.');
        throw new Error('주어진 ID로 레코드를 찾을 수 없습니다.');
    }

    // ID가 존재하면 업데이트
    const { data, error } = await supabase
        .from('challenge_topic')
        .update(formattedData)
        .eq('id', updateData.id);

    console.log('Update query executed:', `UPDATE challenge_topic SET topic=${formattedData.topic}, start_date=${formattedData.start_date}, end_date=${formattedData.end_date}, admin_id=${formattedData.admin_id} WHERE id=${updateData.id}`);  // 쿼리 로그

    // 결과 및 오류 확인
    console.log('Update result:', data);  // 업데이트된 데이터 확인
    console.log('Update error:', error);  // 에러 메시지 확인

    if (error) {
        console.error('Error updating data:', error);
        throw new Error(error.message);
    }

    console.log('Update successful:', data);  // 최종적으로 업데이트된 데이터
  }

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

  async findThisChallengeTopic(topicId: string): Promise<ChallengeTopic | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('challenge_topic')
      .select('*')
      .eq('id', topicId)
      .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        return null;
      }

      return {
        id: data.id, // 기본 키 (Primary Key)
        topic: data.topic, // 주제 제목
        createAt: data.create_at, // 생성 날짜
        startDate: data.start_date, // 시작 날짜
        endDate: data.end_date, // 종료 날짜
        adminId: data.admin_id // 사용자 UUID (외래 키, Foreign Key)
      };
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
