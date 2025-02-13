import { showMyPinListUsecase } from '@/application/usecases/challenge/ShowMyPinListUsecase';
import { SbPinJoinedChallengeRepository } from '@/infrastructure/repositories/SbPinJoinedChallengeRepository';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const pinRepository = new SbPinRepository();
    const pinJoinedChallengeRepository = new SbPinJoinedChallengeRepository();
    const { topicId } = await req.json();
    const result = await showMyPinListUsecase(
      pinRepository,
      pinJoinedChallengeRepository,
      topicId,
    );

    if (!result) {
      return NextResponse.json({ message: 'No my' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('🚨 핀 리스트 조회 오류:', error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
