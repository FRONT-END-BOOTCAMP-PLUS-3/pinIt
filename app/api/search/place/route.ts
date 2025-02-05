import { NextRequest, NextResponse } from 'next/server';
import { SearchUsecase } from '@/application/usecases/pin/SearchUsecase';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { SbLikeRepository } from '@/infrastructure/repositories/SbLikeRepository';

export async function GET(req: NextRequest) {
  try {
    // 요청에서 키워드 가져오기
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('name') || '';

    // 리포지토리 인스턴스 생성
    const pinRepository = new SbPinRepository();
    const likeRepository = new SbLikeRepository();

    // SearchUsecase 실행
    const result = await SearchUsecase(pinRepository, likeRepository, keyword);

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
