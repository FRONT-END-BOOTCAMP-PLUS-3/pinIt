import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { getUserIdFromSupabase } from "@/utils/supabase/getUserIdFromSupabase";

export const updateMyAccountUsecase = async (
    userRepository: UserRepository,
    updatedData: {  id: string; nickname?: string; profileImg?: string; }
): Promise<void> => {
    console.log("updatedData:"+updatedData.id);
    // 현재 로그인된 사용자의 아이디 받아오기
    const userId = await getUserIdFromSupabase();
    const loggedinUser = await userRepository.getUserById(userId);

    if (!loggedinUser) {
        throw new Error("로그인된 사용자의 정보를 찾을 수 없습니다.");
    }

    if (loggedinUser.id != updatedData.id) {
        // console.log("loggedinUser.id:"+loggedinUser.id);
        // console.log("updatedData.id:"+updatedData.id);
        throw new Error("사용자가 일치하지 않습니다.");
    }

    const newData: User = {
      ...loggedinUser, // 기존 사용자 정보 유지
      ...updatedData,  // 변경할 데이터 덮어쓰기
    }

    await userRepository.updateUser(newData);
}