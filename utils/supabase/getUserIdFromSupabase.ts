import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getUserIdFromSupabase() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookies()).getAll();
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('유저 정보를 가져올 수 없습니다.');
  }

  return user.id; // 로그인된 유저 ID 반환
}
