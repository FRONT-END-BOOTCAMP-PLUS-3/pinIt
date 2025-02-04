import { NextResponse } from 'next/server';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { SbLikeRepository } from '@/infrastructure/repositories/SbLikeRepository';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';
import { pinDetailUsecase } from '@/application/usecases/pin/PinDetailUsecase';

export async function GET(request: Request) {
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

    // ✅ 리포지토리 초기화
    const pinRepository = new SbPinRepository();
    const likeRepository = new SbLikeRepository();
    const userRepository = new SbUserRepository();

    // ✅ 핀 상세정보 가져오기
    const pinDetail = await pinDetailUsecase(
      pinRepository,
      likeRepository,
      userRepository,
      pinId,
    );

    return NextResponse.json(pinDetail, { status: 200 });
  } catch (error) {
    console.error('🚨 핀 상세정보 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
