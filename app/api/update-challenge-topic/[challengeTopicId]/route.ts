import { SbChallengeTopicRepository } from "@/infrastructure/repositories/SbChallengeTopicRepository";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        // ✅ URL에서 challengeTopicId 추출
        const { pathname } = new URL(req.url);
        const challengeTopicId = pathname.split('/').pop(); // 마지막 경로(segment) 추출

        if (!challengeTopicId) {
            return NextResponse.json(
                { error: 'challengeTopicId가 필요합니다.' },
                { status: 400 },
            );
        }

        const body = await req.json();

        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json(
                { error: '업데이트할 데이터가 필요합니다.' },
                { status: 400 },
            );
        }

        const challengeTopicRepository = new SbChallengeTopicRepository();
        await challengeTopicRepository.updateChallengeTopic({ id: challengeTopicId, ...body });
        return NextResponse.json({ status: 200 });
    } catch (error: any) {
        console.error('Error in /api/update-challenge-topic:', error);
        return NextResponse.json(
            { message: `Internal Server Error: ${error.message || error}` },
            { status: 500 }
        );
    }
}