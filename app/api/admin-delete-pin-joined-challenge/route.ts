import { DeletePinJoinedChallengeUsecase } from '@/application/usecases/challenge/DeletePinJoinedChallengeUsecase';
import { PinJoinedChallengeRepository } from '@/domain/repositories/PinJoinedChallengeRepository';
import { SbPinJoinedChallengeRepository } from '@/infrastructure/repositories/SbPinJoinedChallengeRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const pinIds = await req.json();
    const pinJoinedChallengeRepository: PinJoinedChallengeRepository =
      new SbPinJoinedChallengeRepository();

    await DeletePinJoinedChallengeUsecase(pinJoinedChallengeRepository, pinIds);

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error('🚨 유저 삭제 오류:', error);

    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
