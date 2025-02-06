import { NextResponse } from 'next/server';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';
import { checkAdminUsecase } from '@/application/usecases/checkAdmin/CheckAdminUsecase';

// GET 요청 핸들러
export async function GET() {
  try {
    // 리포지토리 초기화
    const userRepository = new SbUserRepository();

    // 관리자 여부가져오기
    const data = await checkAdminUsecase(userRepository);

    return NextResponse.json({ isAdmin: data.isAdmin }, { status: 200 });
  } catch (error) {
    console.error('🚨 관리자 여부 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
