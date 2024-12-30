'use server';

import { supabaseUrl } from '@/app/_utils/supabase';
// import { getToday } from '@/app/_utils/helpers';
import { createClient } from '@/app/_utils/supabase/server';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { createCabinSchema, updateCabinSchema } from '../schemas';

export async function getCabins(): Promise<Cabin[]> {
  const supabase = await createClient();

  const { data, error } = (await supabase
    .from('cabins')
    .select('*')) as PostgrestSingleResponse<Cabin[]>;

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return JSON.parse(JSON.stringify(data));
}

export async function getCabin(id: number) {
  const supabase = await createClient();

  const { data, error } = (await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single()) as PostgrestSingleResponse<Cabin>;

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function createCabin(
  _: CreateCabinResponse,
  formData: FormData
): Promise<CreateCabinResponse> {
  //https://rvvvyplknjwcetdlwuwp.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  try {
    const rawData: CreateCabinFormData = {
      name: formData.get('name') as string,
      maxCapacity: Number(formData.get('maxCapacity') as string),
      regularPrice: Number(formData.get('regularPrice') as string),
      discount: Number(formData.get('discount') as string),
      description: formData.get('description') as string,
      image: formData.get('image') as FileList[0],
    };

    // Validate the form data
    const validatedData = createCabinSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Here you would typically save the address to your database
    // console.log('Cabin data validated:', validatedData.data);

    const imageName = `${crypto.randomUUID()}-${
      validatedData.data.image.name
    }`.replace('/course-assets', '');

    if (!supabaseUrl) {
      return {
        success: false,
        message: 'Supabase URL is missing',
      };
    }

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const newCabin = {
      name: validatedData.data.name,
      maxCapacity: validatedData.data.maxCapacity,
      regularPrice: validatedData.data.regularPrice,
      discount: validatedData.data.discount,
      description: validatedData.data.description,
      image: imagePath,
    };

    const supabase = await createClient();

    // 1. Create a cabin
    const { data, error } = (await supabase
      .from('cabins')
      .insert([{ ...newCabin }])
      .select()) as PostgrestSingleResponse<Cabin>;

    if (error) {
      console.error(error);
      throw new Error('Cabins could not be created');
    }

    // 2. Upload a image
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, validatedData.data.image as File);

    // 3. Delete the cabin IF there was an error uploading image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      console.error(storageError);
      throw new Error(
        'Cabins image could not be uploaded and the cabin was not created'
      );
    }

    return {
      success: true,
      message: 'Created cabin successfully!',
    };
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  } finally {
    // Revalidate the cache
    revalidatePath('/dashboard/cabins');
  }
}

export async function updateCabin(
  _: UpdateCabinResponse,
  formData: FormData
): Promise<UpdateCabinResponse> {
  try {
    const rawData: UpdateCabinFormData = {
      name: formData.get('name') as string,
      maxCapacity: Number(formData.get('maxCapacity') as string),
      regularPrice: Number(formData.get('regularPrice') as string),
      discount: Number(formData.get('discount') as string),
      description: formData.get('description') as string,
      image: formData.get('image') as FileList[0],
    };

    // Validate the form data
    const validatedData = updateCabinSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Here you would typically save the address to your database
    // console.log('Cabin data validated:', validatedData.data);

    const imageName = `${crypto.randomUUID()}-${
      validatedData.data.image.name
    }`.replace('/course-assets', '');

    if (!supabaseUrl) {
      return {
        success: false,
        message: 'Supabase URL is missing',
      };
    }

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const updateCabin = {
      name: validatedData.data.name,
      maxCapacity: validatedData.data.maxCapacity,
      regularPrice: validatedData.data.regularPrice,
      discount: validatedData.data.discount,
      description: validatedData.data.description,
      image: imagePath,
    };

    const supabase = await createClient();

    // 1. Create a cabin
    const { data, error } = (await supabase
      .from('cabins')
      .insert([{ ...updateCabin }])
      .select()) as PostgrestSingleResponse<Cabin>;

    if (error) {
      console.error(error);
      throw new Error('Cabins could not be updated');
    }

    // 2. Upload a image
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, validatedData.data.image as File);

    // 3. Delete the cabin IF there was an error uploading image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      console.error(storageError);
      throw new Error(
        'Cabins image could not be uploaded and the cabin was not updated'
      );
    }

    return {
      success: true,
      message: 'Updated cabin successfully!',
    };
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  } finally {
    // Revalidate the cache
    revalidatePath('/dashboard/cabins');
  }
}

export async function deleteCabin(id: number) {
  const supabase = await createClient();

  const { data, error } = (await supabase
    .from('cabins')
    .delete()
    .eq('id', id)) as PostgrestSingleResponse<Cabin>;

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }
  revalidatePath('/dashboard/cabins');
  return data;
}
