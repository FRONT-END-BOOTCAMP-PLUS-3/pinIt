import { showChallengeTopicUsecase } from "@/application/usecases/adminChallenge/ShowChallengeTopicUsecase";
import { ChallengeTopicRepository } from "@/domain/repositories/ChallengeTopicRepository";
import { SbChallengeTopicRepository } from "@/infrastructure/repositories/SbChallengeTopicRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        // ✅ URL에서 challengeTopicId 추출
        const { pathname } = new URL(req.url);
        const challengeTopicId = pathname.split('/').pop(); // 마지막 경로(segment) 추출

        // ✅ challengeTopicId가 없는 경우 예외 처리
        if (!challengeTopicId || challengeTopicId === "undefined") {
            return NextResponse.json({ message: "Missing challengeTopicId" }, { status: 400 });
        }

        const challengeTopicRepository: ChallengeTopicRepository = new SbChallengeTopicRepository();
        const challengeTopic = await showChallengeTopicUsecase(challengeTopicRepository, challengeTopicId);

        return NextResponse.json(challengeTopic, { status: 200 });
    } catch (error: any) {
        console.error('Error in /api/show-challenge-topic:', error);
        return NextResponse.json(
            { message: `Internal Server Error: ${error.message || error}` },
            { status: 500 }
        );
    }
}