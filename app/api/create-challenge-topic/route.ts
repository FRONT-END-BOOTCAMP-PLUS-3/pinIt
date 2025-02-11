import { NextRequest, NextResponse } from "next/server";
import { createChallengeTopicUsecase } from "@/application/usecases/adminChallenge/CreateChallengeTopicUsecase";
import { ChallengeTopicDto } from "@/application/usecases/challenge/dto/ChallengeTopicDto";
import { ChallengeTopicRepository } from "@/domain/repositories/ChallengeTopicRepository";
import { SbChallengeTopicRepository } from "@/infrastructure/repositories/SbChallengeTopicRepository";

export async function POST(req: NextRequest) {
    try {
        // 요청 데이터 파싱
        const data: ChallengeTopicDto = await req.json();
        
        const challengeTopicRepository: ChallengeTopicRepository =
            new SbChallengeTopicRepository();
        
        // 챌린지 주제 생성 실행
        await createChallengeTopicUsecase(challengeTopicRepository, data);

        return NextResponse.json({ message: '챌린지 주제 생성 완료' }, { status: 200 });
    } catch (error) {
        console.error('🚨 챌린지 주제 생성 오류:', error);
        return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
    }
}