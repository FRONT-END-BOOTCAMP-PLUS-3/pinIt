import { ProfileDto } from "./dto/ProfileDto";
import { SbUserRepository } from "@/infrastructure/repositories/SbUserRepository";

export const userProfileUsecase = async (
    userId: string
): Promise<ProfileDto | null> => {
    // ✅ 리포지토리 초기화
    const userRepository = new SbUserRepository();
    // ✅ prop으로 전달받은 userId로 사용자 데이터 받아옴
    const userData = await userRepository.getUserById(userId);

    return {
        id: userId ?? '',
        nickname: userData.nickname ?? '', // userName 추가
        email: userData.email ?? '', // userEmail 추가
    };
} ;