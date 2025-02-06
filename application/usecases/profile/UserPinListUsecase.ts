import { PinRepository } from "@/domain/repositories/PinRepository";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { PinDto } from "./dto/PinDto";

// 주소에서 두 단어만 추출하는 함수
const extractTwoWords = (address: string): string => {
  const words = address.split(' ');
  return words.slice(0, 2).join(' ');
};

export const userPinListUsecase = async (
    pinRepository: PinRepository,
    userRepository: UserRepository,
    userId: string,
): Promise<PinDto[] | null> => {
    //prop으로 전달받은 userId로 사용자 데이터 받아옴
    const userData = await userRepository.getUserById(userId);

    // userId가 null인 경우 처리
    if (!userId) {
        throw new Error('User ID is null');
    }
    
    // 모든 핀 리스트 가져오기
    const pins = await pinRepository.findPinsByUserId(userId);

    // 각 핀의 좋아요 여부 확인 및 주소 가공
    const pinList = pins.map((pin) => {
      return {
        userId: userId,
        userName: userData.nickname, // userName 추가
        userEmail: userData.email, // userEmail 추가
        id: pin.id || ' ',
        placeName: pin.placeName,
        address: extractTwoWords(pin.address), // 두 단어만 유지
        image: pin.image,
      };
    });

    return pinList;
};