import { createPinJoinedChallengeUsecase } from '@/application/usecases/challenge/CreatePinJoinedChallengeUsecase';
import { CreatePinJoinedChallengeDto } from '@/application/usecases/challenge/dto/CreatePinJoinedChallenge';
import { PinJoinedChallengeRepository } from '@/domain/repositories/PinJoinedChallengeRepository';
import { SbPinJoinedChallengeRepository } from '@/infrastructure/repositories/SbPinJoinedChallengeRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data: CreatePinJoinedChallengeDto[] = await req.json();
    const pinJoinedChallengeRepository: PinJoinedChallengeRepository =
      new SbPinJoinedChallengeRepository();

    await createPinJoinedChallengeUsecase(pinJoinedChallengeRepository, data);

    return NextResponse.json({ message: '챌린지 등록 완료' }, { status: 201 });
  } catch (error) {
    console.error('🚨 챌린지 등록 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
