import { updateMyAccountUsecase } from "@/application/usecases/profile/UpdateMyAccountUsecase";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const userRepository: UserRepository = new SbUserRepository();
        const formData = await req.formData();

        let userId: string = "";
        let nickname: string | undefined;
        let imageUrl: string | undefined;

        if (formData.get("id")) {
            userId = formData.get("id")?.toString() || "";
        }
        if (formData.get("nickname") != null) {
            nickname = formData.get("nickname")?.toString() || "";
        }
        if (formData.get("imageUrl")) {
            imageUrl = formData.get("imageUrl")?.toString();
        }

        const updatedData: {
            id: string;
            nickname?: string | undefined;
            profileImg?: string | undefined;
        } = {
            id: userId,
            ...(nickname && { nickname }), // nickname이 있을 때만 추가
            ...(imageUrl && { profileImg: imageUrl }), // imageUrl이 있을 때만 추가
        };
        await updateMyAccountUsecase(userRepository, updatedData);
        return NextResponse.json({ status: 200 });
    } catch (error: any) {
        console.error('🚨 유저 프로필 조회 오류:', error);
        return NextResponse.json(
            { message: `Internal Server Error: ${error.message || error}` },
            { status: 500 },
        );
    }
}