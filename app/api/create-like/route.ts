import { createLikeUsecase } from '@/application/usecases/like/CreateLikeUsecase';
import { CreateLikeDto } from '@/application/usecases/like/dto/CreateLikeDto';
import { LikeRepository } from '@/domain/repositories/LikeRepository';
import { SbLikeRepository } from '@/infrastructure/repositories/SbLikeRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 요청 데이터 파싱
    const data: CreateLikeDto = await req.json();

    const likeRepository: LikeRepository = new SbLikeRepository();

    await createLikeUsecase(likeRepository, data);

    console.log(data);

    return NextResponse.json({ message: '좋아요 생성 완료' }, { status: 201 });
  } catch (error) {
    console.error('좋아요 생성 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
