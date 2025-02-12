import { checkPinUserIdUsecase } from "@/application/usecases/pin/CheckPinUserIdUsecase";
import { SbPinRepository } from "@/infrastructure/repositories/SbPinRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // 리포지토리 초기화
        const pinRepository = new SbPinRepository();
        const userRepository = new SbUserRepository();

        // request에서 pinId 가져오기
        const { pinId } = await req.json();

        // checkPinUserId 실행
        const data = await checkPinUserIdUsecase(pinRepository, userRepository, pinId);

        // ✅ JSON 응답 반환
        return NextResponse.json({ isOwn: data }, { status: 200 });
    } catch (error) {
        console.error("🚨 유저 아이디 조회 오류:", error);
        return NextResponse.json({ error: '서버 오류 발생' }, { status: 500 });
    }
}