import { UserIdDto } from '@/application/usecases/admin/user/dto/UserIdDto';
import { showUserProfileUsecase } from '@/application/usecases/admin/user/ShowUserProfileUsecase';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const userId: UserIdDto = await req.json();

    const userRepository: UserRepository = new SbUserRepository();

    // console.log(userId.id, "| Type:", typeof userId.id);
    // console.log("🔍 Received userId:", userId.id, "| Type:", typeof userId.id);

    const result = await showUserProfileUsecase(userRepository, userId.id);

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
