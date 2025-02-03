import { thisWeekChallengedPinListUsecase } from '@/application/usecases/challenge/ThisWeekChallengedPinListUsecase';
import { SbChallengeTopicRepository } from '@/infrastructure/repositories/SbChallengeTopicRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const challengeTopicRepository = new SbChallengeTopicRepository();
    const challengeTopic = await thisWeekChallengedPinListUsecase(
      challengeTopicRepository,
    );

    if (!challengeTopic) {
      return NextResponse.json(
        { message: 'No active challenge topic this week' },
        { status: 404 },
      );
    }

    return NextResponse.json(challengeTopic, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
