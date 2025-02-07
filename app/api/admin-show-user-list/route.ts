import { showUserListUsecase } from '@/application/usecases/admin/user/ShowUserListUsecase';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  const userRepository = new SbUserRepository();

  try {
    const result = await showUserListUsecase(userRepository);

    if (!result) {
      return NextResponse.json(
        { message: 'No users on list' },
        { status: 404 },
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('🚨 유저 리스트 조회 오류:', error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
