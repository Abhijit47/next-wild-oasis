'use server';

import { createClient } from '@/app/_utils/supabase/server';
import { UserResponse } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    fullName: formData.get('fullname') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

export async function logout() {
  const supabase = await createClient();

  // Check if a user's logged in
  const {
    data: { user },
  } = (await supabase.auth.getUser()) as UserResponse;

  if (user) {
    await supabase.auth.signOut();
  }

  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function getCurrentUser() {
  const supabase = await createClient();

  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = (await supabase.auth.getUser()) as UserResponse;

  if (error) throw new Error(error.message);

  return JSON.parse(JSON.stringify(data));
}
