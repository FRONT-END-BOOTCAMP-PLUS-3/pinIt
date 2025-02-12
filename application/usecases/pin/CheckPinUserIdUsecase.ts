import { PinRepository } from "@/domain/repositories/PinRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { getUserIdFromSupabase } from "@/utils/supabase/getUserIdFromSupabase";

export const checkPinUserIdUsecase = async (
    pinRepository: PinRepository,
    userRepository: UserRepository,
    pinId: string,
): Promise<boolean | null> => {
    const userId = await getUserIdFromSupabase();

    if (!userId) {
        return false; // 로그인된 사용자 ID가 없으면 false 반환
    }

    // ✅ pinId에 해당하는 핀 가져오기 (배열 형태 가능)
    const pins = await pinRepository.getPinById(pinId);
    if (!pins) {
        console.error(`🚨 핀을 찾을 수 없음: pinId=${pinId}`);
        return null; // ✅ 핀이 존재하지 않으면 null 반환
    }

    // ✅ 첫 번째 핀만 선택하여 소유자 ID 확인
    const pin = Array.isArray(pins) ? pins[0] : pins; // ✅ 배열이면 첫 번째 요소 선택

    // ✅ 핀을 생성한 사용자 ID 가져오기
    const loggedInUser = await userRepository.getUserById(pin.userId);
    
    if (!loggedInUser || !loggedInUser.id) {
        console.error(`🚨 핀의 소유자 정보를 찾을 수 없음: pinId=${pinId}, userId=${pin.userId}`);
        return false;
    }
    
    // ✅ 현재 로그인한 userId와 핀 소유자의 loggedInId 비교
    return userId === loggedInUser.id;
}