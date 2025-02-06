import { showChallengeTopicListUsecase } from '@/application/usecases/challenge/ShowChallengeTopicListUsecase';
import { SbChallengeTopicRepository } from '@/infrastructure/repositories/SbChallengeTopicRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  const challengeTopicRepository = new SbChallengeTopicRepository();

  try {
    // 유즈케이스 호출
    const result = await showChallengeTopicListUsecase(
      challengeTopicRepository,
    );

    if (!result) {
      return NextResponse.json(
        { message: 'No challenge topics' },
        { status: 404 },
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/challenge-topic-list:', error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
