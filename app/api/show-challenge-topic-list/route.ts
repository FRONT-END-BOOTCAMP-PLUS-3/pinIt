import { challengeTopicsListUsecase } from "@/application/usecases/adminChallenge/ChallengeTopicsListUsecase";
import { SbChallengeTopicRepository } from "@/infrastructure/repositories/SbChallengeTopicRepository";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const challengeTopicRepository = new SbChallengeTopicRepository();
        const challengeTopicsList = await challengeTopicsListUsecase(challengeTopicRepository);

        return NextResponse.json(challengeTopicsList, { status: 200 });
    } catch (error: any) {
        console.error('Error in /api/show-challenged-topic-list:', error);
        return NextResponse.json(
            { message: `Internal Server Error: ${error.message || error}` },
            { status: 500 },
        );
    }
}