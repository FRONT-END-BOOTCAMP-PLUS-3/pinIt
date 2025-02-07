import { TopicIdDto } from '@/application/usecases/challenge/dto/TopicIdDto';
import { showChallengedPinListUsecase } from '@/application/usecases/challenge/ShowChallengedPinListUsecase';
import { SbLikeRepository } from '@/infrastructure/repositories/SbLikeRepository';
import { SbPinJoinedChallengeRepository } from '@/infrastructure/repositories/SbPinJoinedChallengeRepository';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const topicId: TopicIdDto = await req.json();

    const pinJoinedChallenge = new SbPinJoinedChallengeRepository();
    const pinRepository = new SbPinRepository();
    const likeRepository = new SbLikeRepository();

    const pins = await showChallengedPinListUsecase(
      pinJoinedChallenge,
      pinRepository,
      likeRepository,
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
