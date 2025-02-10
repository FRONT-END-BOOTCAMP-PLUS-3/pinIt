import { showChallengedPinListUsecase } from '@/application/usecases/admin/pinJoinedChallenge/ShowPinJoinedChallengeUsecase';
import { TopicIdDto } from '@/application/usecases/challenge/dto/TopicIdDto';
import { SbPinJoinedChallengeRepository } from '@/infrastructure/repositories/SbPinJoinedChallengeRepository';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const topicId: TopicIdDto = await req.json();
    const pinJoinedChallenge = new SbPinJoinedChallengeRepository();
    const pinRepository = new SbPinRepository();

    const pins = await showChallengedPinListUsecase(
      pinJoinedChallenge,
      pinRepository,
      topicId.id,
    );

    return NextResponse.json(pins, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/show-challenged-pin-list:', error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
