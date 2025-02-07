import { DeleteUserUsecase } from '@/application/usecases/admin/user/DeleteUserUsecase';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const userIds = await req.json();
    const userRepository: UserRepository = new SbUserRepository();

    await DeleteUserUsecase(userRepository, userIds);

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error('🚨 유저 삭제 오류:', error);

    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
