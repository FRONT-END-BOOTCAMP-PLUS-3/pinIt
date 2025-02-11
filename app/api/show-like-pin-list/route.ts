import { likeListUsecase } from '@/application/usecases/like/LikeListUsecase';
import { SbLikeRepository } from '@/infrastructure/repositories/SbLikeRepository';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 레포 초기화
    const pinRepository = new SbPinRepository();
    const likeRepository = new SbLikeRepository();

    const pins = await likeListUsecase(pinRepository, likeRepository);

    return NextResponse.json(pins, { status: 200 });
  } catch (error) {
    console.log('🚨 핀 리스트 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
