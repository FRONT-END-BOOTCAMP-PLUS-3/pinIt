import { NextRequest, NextResponse } from 'next/server';
import { searchUserUsecase } from '@/application/usecases/pin/SearchUserUsecase';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';

export async function GET(req: NextRequest) {
  try {
    // 요청에서 키워드 가져오기
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('name') || '';

    // 리포지토리 인스턴스 생성
    const userRepository = new SbUserRepository();

    // SearchUsecase 실행
    const result = await searchUserUsecase(userRepository, keyword);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Search API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    );
  }
}
