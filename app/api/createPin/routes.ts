import { NextRequest, NextResponse } from 'next/server';
import { createPin } from '@/application/usecases/pin/CreatePinUsecase';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { CreatePinDto } from '@/application/usecases/pin/dto/CreatePinDto';
import { PinRepository } from '@/domain/repositories/PinRepository';

// POST 요청 핸들러
export async function POST(req: NextRequest) {
  try {
    // 요청 데이터 파싱
    const data: CreatePinDto = await req.json();

    // 유효성 검사
    if (!data.placeName || !data.userId) {
      return NextResponse.json(
        { error: '장소 이름과 사용자 ID는 필수입니다.' },
        { status: 400 },
      );
    }
    const pinRepository: PinRepository = new SbPinRepository();

    // 핀 생성 실행
    await createPin(pinRepository, data);

    return NextResponse.json({ message: '핀 생성 완료' }, { status: 201 });
  } catch (error) {
    console.error('🚨 핀 생성 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
