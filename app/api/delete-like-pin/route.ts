import { SbLikeRepository } from '@/infrastructure/repositories/SbLikeRepository';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const likeRepository = new SbLikeRepository();
    await likeRepository.deleteLike(id);

    return NextResponse.json({ message: '좋아요 취소 성공' }, { status: 200 });
  } catch (error) {
    console.error('🚨 좋아요 삭제 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
