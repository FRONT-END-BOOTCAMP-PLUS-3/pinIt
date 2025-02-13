import { PinDto } from '@/application/usecases/profile/dto/PinDto';

export const showMyPinList = async (userId: string) => {
    const response: Response = await fetch('/api/show-my-pin-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`,
            'body': JSON.stringify({}),
        }
    });

    const result: PinDto[] = await response.json();

    return result;
};