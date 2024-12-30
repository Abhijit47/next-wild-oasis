'use server';

import { createClient } from '@/app/_utils/supabase/server';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { updateSettingsSchema } from '../schemas';

export async function getSettings() {
  const supabase = await createClient();

  const { data, error } = (await supabase
    .from('settings')
    .select('*')
    .single()) as PostgrestSingleResponse<Settings>;

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSettings(
  _: UpdateSettingsResponse,
  formData: FormData
): Promise<UpdateSettingsResponse> {
  try {
    const rawData: UpdateSettingsFormData = {
      minBookingLength: formData.get('minBookingLength') as string,
      maxBookingLength: formData.get('maxBookingLength') as string,
      maxGuestsPerBooking: formData.get('maxGuestsPerBooking') as string,
      breakfastPrice: formData.get('breakfastPrice') as string,
    };

    // Validate the form data
    const validatedData = updateSettingsSchema.safeParse({
      minBookingLength: Number(rawData.minBookingLength),
      maxBookingLength: Number(rawData.maxBookingLength),
      maxGuestsPerBooking: Number(rawData.maxGuestsPerBooking),
      breakfastPrice: Number(rawData.breakfastPrice),
    });

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Here you would typically save the address to your database
    // console.log('Settings data validated:', validatedData.data);

    const newSetting = {
      minBookingLength: validatedData.data.minBookingLength,
      maxBookingLength: validatedData.data.maxBookingLength,
      maxGuestsPerBooking: validatedData.data.maxGuestsPerBooking,
      breakfastPrice: validatedData.data.breakfastPrice,
    };

    const supabase = await createClient();

    const { error } = (await supabase
      .from('settings')
      .update(newSetting)
      // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
      .eq('id', 1)
      .single()) as PostgrestSingleResponse<Settings>;

    if (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: true,
      message: 'Settings updated successfully',
    };
  } catch (error) {
    console.error(error);
    // throw new Error('Settings could not be updated');
    return {
      success: false,
      message: 'Settings could not be updated',
    };
  } finally {
    revalidatePath('/dashboard/settings');
  }
}
