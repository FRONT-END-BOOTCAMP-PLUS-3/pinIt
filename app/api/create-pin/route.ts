import { NextRequest, NextResponse } from 'next/server';
import { createPinUsecase } from '@/application/usecases/pin/CreatePinUsecase';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { CreatePinDto } from '@/application/usecases/pin/dto/CreatePinDto';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { getUserIdFromSupabase } from '@/utils/supabase/getUserIdFromSupabase';

// POST 요청 핸들러
export async function POST(req: NextRequest) {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userId = await getUserIdFromSupabase();
    // 요청 데이터 파싱
    const data: CreatePinDto = await req.json();

    const pinRepository: PinRepository = new SbPinRepository();

    // 핀 생성 실행
    await createPinUsecase(pinRepository, { ...data, userId });

    return NextResponse.json({ message: '핀 생성 완료' }, { status: 201 });
  } catch (error) {
    console.error('🚨 핀 생성 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
