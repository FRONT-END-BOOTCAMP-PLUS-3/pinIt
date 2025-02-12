import { NextRequest, NextResponse } from 'next/server';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';
import { myPinListUsecase } from '@/application/usecases/profile/MyPinListUsecase';
import { SbLikeRepository } from '@/infrastructure/repositories/SbLikeRepository';

// GET 요청 핸들러
export async function GET(req: NextRequest) {
  try {
    // 헤더에서 userId 추출
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'User ID is missing or invalid' },
        { status: 400 },
      );
    }
    const userId = authHeader.replace('Bearer ', '').trim();

    // 리포지토리 초기화
    const pinRepository = new SbPinRepository();
    const userRepository = new SbUserRepository();
    const likeRepository = new SbLikeRepository();

    // 핀 리스트 가져오기
    const pins = await myPinListUsecase(
      pinRepository,
      userRepository,
      userId,
      likeRepository,
    );

    return NextResponse.json(pins, { status: 200 });
  } catch (error) {
    console.error('🚨 핀 리스트 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
