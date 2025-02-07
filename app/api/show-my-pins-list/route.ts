import { showMyPinListUsecase } from '@/application/usecases/challenge/ShowMyPinListUsercase';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const pinRepository = new SbPinRepository();
    const result = await showMyPinListUsecase(pinRepository);

    if (!result) {
      return NextResponse.json({ message: 'No my' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('🚨 핀 리스트 조회 오류:', error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
