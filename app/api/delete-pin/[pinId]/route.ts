import { NextRequest, NextResponse } from 'next/server';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { deletePinUsecase } from '@/application/usecases/pin/DeletePinUsecase';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';

// POST 요청 핸들러
export async function DELETE(request: NextRequest) {
  try {
    // ✅ URL에서 pinId 추출
    const { pathname } = new URL(request.url);
    const pinId = pathname.split('/').pop(); // 마지막 경로(segment) 추출

    if (!pinId) {
      return NextResponse.json(
        { error: 'pinId가 필요합니다.' },
        { status: 400 },
      );
    }

    const pinRepository: PinRepository = new SbPinRepository();
    const userRepository: UserRepository = new SbUserRepository();

    // 핀 삭제 실행
    await deletePinUsecase(pinRepository, userRepository, pinId);

    return NextResponse.json({ message: '핀 삭제 완료' }, { status: 200 });
  } catch (error) {
    console.error('🚨 핀 삭제 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
