import { NextResponse } from 'next/server';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';

// PATCH 요청 핸들러 (핀 업데이트)
export async function PATCH(request: Request) {
  try {
    // URL에서 pinId 추출
    const { pathname } = new URL(request.url);
    const pinId = pathname.split('/').pop(); // 마지막 경로(segment) 추출

    if (!pinId) {
      return NextResponse.json(
        { error: '📌 pinId가 필요합니다.' },
        { status: 400 },
      );
    }

    // 요청 본문(body)에서 업데이트할 데이터 추출
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: '📌 업데이트할 데이터가 필요합니다.' },
        { status: 400 },
      );
    }

    // 리포지토리 초기화 및 핀 업데이트 실행
    const pinRepository = new SbPinRepository();
    await pinRepository.updatePin({ id: pinId, ...body });

    return NextResponse.json(
      { message: '✅ 핀이 성공적으로 업데이트되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('🚨 핀 업데이트 오류:', error);
    return NextResponse.json({ error: '❌ 서버 오류 발생' }, { status: 500 });
  }
}
