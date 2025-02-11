import { getUserIdFromSupabase } from "@/utils/supabase/getUserIdFromSupabase"
import { ChallengeTopicRepository } from "@/domain/repositories/ChallengeTopicRepository";
import { ChallengeTopic } from "@/domain/entities/ChallengeTopic";

export const createChallengeTopicUsecase = async (
    challengeTopicRepository: ChallengeTopicRepository,
    data: ChallengeTopic
): Promise<void> => {
    // 현재 로그인된 관리자의 아이디 받아오기
    const awaitAdminId = await getUserIdFromSupabase();
    // adminId가 false일 경우 null로 처리
    const adminId = awaitAdminId ? awaitAdminId : null;

    // Dto를 인자로 받았고, 레포지토리에는 ChallengeTopic 엔티티의 형태로 전송해줘야 하기 때문에 변환해주기
    // 없는건 null로 보내주면 됨
    const newData: ChallengeTopic = {
        id: null, // 기본 키 (Primary Key)
        topic: data.topic, // 주제 제목
        createAt: data.createAt, // 생성 날짜
        startDate: data.startDate, // 시작 날짜
        endDate: data.endDate, // 종료 날짜
        adminId: adminId, // 사용자 UUID (외래 키, Foreign Key)
    };
    await challengeTopicRepository.createChallengeTopic(newData);
}