import { NextRequest, NextResponse } from 'next/server';
import { SbPinRepository } from '@/infrastructure/repositories/SbPinRepository';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { DeletePinUsecase } from '@/application/usecases/admin/pin/DeletePinUsecase';

export async function DELETE(request: NextRequest) {
  try {
    const { checkedItems } = await request.json();

    if (
      !checkedItems ||
      !Array.isArray(checkedItems) ||
      checkedItems.length === 0
    ) {
      return NextResponse.json(
        { error: '삭제할 핀이 없습니다.' },
        { status: 400 },
      );
    }

    const pinRepository: PinRepository = new SbPinRepository();

    await DeletePinUsecase(pinRepository, checkedItems);

    return NextResponse.json({ message: '핀 삭제 완료' }, { status: 200 });
  } catch (error) {
    console.error('🚨 핀 삭제 오류:', error);
    return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
  }
}
