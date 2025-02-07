import { UpdateUserDto } from '@/application/usecases/admin/user/dto/UpdateUserDto';
import { UpdateUserUsecase } from '@/application/usecases/admin/user/UpdateUserUsecase';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
    const userData: UpdateUserDto = await req.json();
    const userRepository: UserRepository = new SbUserRepository();

    if (!userData || Object.keys(userData).length === 0) {
      return NextResponse.json(
        { error: '📌 업데이트할 데이터가 필요합니다.' },
        { status: 400 },
      );
    }

    await UpdateUserUsecase(userRepository, userData);

    return NextResponse.json(
      { message: '관리자 권한이 업데이트되었습니다.' },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('🚨 관리자 권한 업데이트 오류:', error);

    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
