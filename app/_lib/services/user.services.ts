'use server';

import { supabaseUrl } from '@/app/_utils/supabase';
import { createClient } from '@/app/_utils/supabase/server';
import {
  PostgrestSingleResponse,
  User,
  UserResponse,
} from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import {
  createUserSchema,
  updatePasswordSchema,
  updateUserSchema,
} from '../schemas';

export async function getUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = (await supabase.auth.getUser()) as UserResponse;

  return JSON.parse(JSON.stringify(user));
}

export async function getGuest(email: string) {
  const supabase = await createClient();
  const { data, error } = (await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single()) as PostgrestSingleResponse<User>;

  if (error) {
    console.error('An unexpected error occurred:', error);
    throw new Error('An unexpected error occurred');
  }

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function createUser(
  _: CreateUserActionResponse,
  formData: FormData
): Promise<CreateUserActionResponse> {
  try {
    const rawData: CreateUserFormData = {
      fullname: formData.get('fullname') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    // Validate the form data
    const validatedData = createUserSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Here you would typically save the address to your database
    // console.log('User created:', validatedData.data);

    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email: validatedData.data.email,
      password: validatedData.data.password,
      options: {
        data: {
          fullName: validatedData.data.fullname,
          avatar: '',
        },
      },
    });

    if (error) {
      console.error('An unexpected error occurred:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
      };
    }

    return {
      success: true,
      message: 'Created user successfully!',
    };
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  } finally {
    revalidatePath('/dashboard/users');
  }
}

export async function updateUserData(
  _: UpdateUserResponse | null,
  formData: FormData
): Promise<UpdateUserResponse> {
  try {
    // console.log('formData', Object.fromEntries(formData.entries()));
    const rawData: UpdateUserFormData = {
      fullName: formData.get('fullName') as string,
      avatar: formData.get('avatar') as FileList[0],
    };

    // Validate the form data
    const validatedData = updateUserSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Here you would typically save the data to your database
    // console.log('Update user:', validatedData.data);
    const supabase = await createClient();

    const { data, error } = await supabase.auth.updateUser({
      data: {
        fullName: validatedData.data.fullName,
      },
    });

    if (error) throw new Error(error.message);

    // 2. Upload the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, rawData.avatar);

    if (storageError) throw new Error(storageError.message);

    // 3. Update avatar in the user
    const { data: updatedUser, error: err } = await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

    if (err) throw new Error(err.message);

    console.log('Updated user:', updatedUser);

    return {
      success: true,
      message: 'Update user successfully!',
    };
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  } finally {
    revalidatePath('/dashboard/account');
  }
}

export async function updatePassword(
  _: UpdatePasswordResponse,
  formData: FormData
): Promise<UpdatePasswordResponse> {
  try {
    const rawData: UpdatePasswordFormData = {
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    // Validate the form data
    const validatedData = updatePasswordSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Here you would typically save the address to your database
    // console.log('Update password:', validatedData.data);

    const supabase = await createClient();

    const { error } = (await supabase.auth.updateUser({
      password: validatedData.data.password,
    })) as UserResponse;

    if (error) {
      console.error('An unexpected error occurred:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
      };
    }

    return {
      success: true,
      message: 'Updated Password successfully!',
    };
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  } finally {
    revalidatePath('/dashboard/account');
  }
}
