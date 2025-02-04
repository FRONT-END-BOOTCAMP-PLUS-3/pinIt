import { thisWeekChallengedPinListUsecase } from '@/application/usecases/challenge/ThisWeekChallengedPinListUsecase';
import { SbChallengeTopicRepository } from '@/infrastructure/repositories/SbChallengeTopicRepository';
import { SbPinJoinedChallengeRepository } from '@/infrastructure/repositories/SbPinJoinedChallengeRepository';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  const challengeTopicRepository = new SbChallengeTopicRepository();
  const pinJoinedChallengeRepository = new SbPinJoinedChallengeRepository();
  const pinRepository = new SbPinRepository();

  try {
    // 유즈케이스 호출
    const result = await thisWeekChallengedPinListUsecase(
      challengeTopicRepository,
      pinJoinedChallengeRepository,
      pinRepository,
    );

    if (!result) {
      return NextResponse.json(
        { message: 'No active challenge topic this week' },
        { status: 404 },
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/challenge-topic/this-week route:', error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
