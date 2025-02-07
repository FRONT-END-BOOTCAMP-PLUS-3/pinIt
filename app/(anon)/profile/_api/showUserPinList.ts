import { PinDto } from '@/application/usecases/profile/dto/PinDto';

export const showUserPinList = async (userId: string) => {
    // ✅ Base64 인코딩을 사용하여 안전하게 전달
    const encodedUserId = Buffer.from(userId, 'utf-8').toString('base64');

    const response: Response = await fetch('/api/show-user-pin-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${encodedUserId}`,
            'body': JSON.stringify({ id: userId }),
        }
    });

    const result: PinDto[] = await response.json();

    return result;
};