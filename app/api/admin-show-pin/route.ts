import { NextResponse } from 'next/server';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { TotalPinsListUsecase } from '@/application/usecases/admin/pin/TotalPinsListUsecase';

// GET 요청 핸들러
export async function GET() {
  try {
    // 리포지토리 초기화
    const pinRepository = new SbPinRepository();

    // 핀 리스트 가져오기
    const pins = await TotalPinsListUsecase(pinRepository);

    return NextResponse.json(pins, { status: 200 });
  } catch (error) {
    console.error('🚨 핀 리스트 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
