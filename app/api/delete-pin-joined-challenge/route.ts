import { DeleteMyPinFromChallengeUsecase } from '@/application/usecases/challenge/DeleteMyPinFromChallengeUsecase';
import { SbPinJoinedChallengeRepository } from '@/infrastructure/repositories/SbPinJoinedChallengeRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const pinIds = await req.json();
    const pinJoinedChallengeRepository = new SbPinJoinedChallengeRepository();

    await DeleteMyPinFromChallengeUsecase(pinJoinedChallengeRepository, pinIds);

    return NextResponse.json({ message: '삭제 완료' }, { status: 200 });
  } catch (error) {
    console.error('🚨 삭제 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
