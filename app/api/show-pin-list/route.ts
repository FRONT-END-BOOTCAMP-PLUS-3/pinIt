import { NextResponse } from 'next/server';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { SbLikeRepository } from '@/infrastructure/repositories/SbLikeRepository';
import { showPinListUsecase } from '@/application/usecases/pin/ShowPinListUsecase';

// GET 요청 핸들러
export async function GET() {
  try {
    // 리포지토리 초기화
    const pinRepository = new SbPinRepository();
    const likeRepository = new SbLikeRepository();

    // 핀 리스트 가져오기
    const pins = await showPinListUsecase(pinRepository, likeRepository);

    return NextResponse.json(pins, { status: 200 });
  } catch (error) {
    console.error('🚨 핀 리스트 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
