import { showNearByPinListUsecase } from '@/application/usecases/map/PinListOnMapUsecase';
import { SbLikeRepository } from '@/infrastructure/repositories/SbLikeRepository';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 레포지토리 초기화
    const pinRepository = new SbPinRepository();
    const likeRepository = new SbLikeRepository();

    //핀 리스트 가져오기
    const nearByPins = await showNearByPinListUsecase(
      pinRepository,
      likeRepository,
    );

    return NextResponse.json(nearByPins, { status: 200 });
  } catch (error) {
    console.error('🚨 핀 리스트 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
