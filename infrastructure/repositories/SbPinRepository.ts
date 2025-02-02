import { PinCreate } from '@/domain/entities/pin/CreatePin';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { createClient } from '@/utils/supabase/server';
import { randomUUID } from 'crypto';

export default class SbPinRepository implements PinRepository {
  async createPin(data: PinCreate): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from('pin')
      .insert([
        {
          id: randomUUID(),
          place_name: data.placeName,
          capture_date: data.captureDate,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          tags: data.tags,
          description: data.description,
          counted_like: 0,
          created_at: new Date(),
          image: data.image,
          user_id: data.userId,
        },
      ])
      .select();
    if (error) {
      throw new Error(error.message);
    }
  }
}
