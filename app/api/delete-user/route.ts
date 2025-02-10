import { DeleteUserUsecase } from '@/application/usecases/profile/DeleteUserUsecase';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    const userId = await req.json();
    const userRepository: UserRepository = new SbUserRepository();

    await DeleteUserUsecase(userRepository, userId);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    try {
      //   const { error } = await supabase.auth.admin.deleteUser(userId, true);
      await supabase.auth.admin.deleteUser(userId, true);
    } catch (error: any) {
      console.error(error.message);
    }

    // if (error) {
    //   throw new Error(`사용자 삭제 중 오류 발생: ${error.message}`);
    // }

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || error}` },
      { status: 500 },
    );
  }
}
