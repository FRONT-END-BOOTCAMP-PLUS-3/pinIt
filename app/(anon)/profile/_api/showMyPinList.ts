import { PinDto } from '@/application/usecases/profile/dto/PinDto';

export const showMyPinList = async (userId: string) => {
    const response: Response = await fetch('/api/show-my-pin-list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`
        }
    });

    const result: PinDto[] = await response.json();

    return result;
};