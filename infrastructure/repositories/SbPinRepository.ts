import { CreatePin } from '@/domain/entities/pin/CreatePin';
import { Pin } from '@/domain/entities/pin/Pin';
import { PinRepository } from '@/domain/repositories/PinRepository';
import { createClient } from '@/utils/supabase/server';
import { randomUUID } from 'crypto';

export class SbPinRepository implements PinRepository {
  async createPin(data: CreatePin): Promise<void> {
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
          count_like: 0,
          create_at: new Date(),
          image: data.image,
          user_id: data.userId,
        },
      ])
      .select();
    if (error) {
      throw new Error(error.message);
    }
  }
  async showPin(): Promise<Pin[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('pin')
      .select('*')
      .order('create_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  }
}
