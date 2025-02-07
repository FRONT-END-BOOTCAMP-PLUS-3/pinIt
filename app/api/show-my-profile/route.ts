import { showMyProfileUsecase } from '@/application/usecases/admin/user/ShowMyProfileUsecase';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const userRepository: UserRepository = new SbUserRepository();

    const result = await showMyProfileUsecase(userRepository);

    if (!result) {
      return NextResponse.json({ message: 'No user profile' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('🚨 유저 프로필 조회 오류:', error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
