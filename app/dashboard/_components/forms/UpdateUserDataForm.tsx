'use client';

import { UpdateUserDataFormInitialState } from '@/app/_constants';
// import { UpdateUserDataFormInitialState } from '@/app/_constants';
import { updateUserData } from '@/app/_lib/services/user.services';
import { classNames } from '@/app/_utils/helpers';
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from '@headlessui/react';
import { User } from '@supabase/supabase-js';
import { useActionState, useTransition } from 'react';
import { toast } from 'sonner';

export default function UpdateUserDataForm({ user }: { user: User }) {
  const [state, action, isPending] = useActionState(
    updateUserData,
    UpdateUserDataFormInitialState
  );
  const [isTransition, startTransition] = useTransition();

  function updateUserAction(formData: FormData) {
    startTransition(() => {
      action(formData);
      if (state.success) {
        toast.success(state.message);
        return;
      }

      if (!state.success) {
        toast.error("Couldn't update user");
        return;
      }
    });
  }

  return (
    <form action={updateUserAction}>
      <div className='w-full p-4'>
        <Fieldset className='space-y-6 rounded-xl bg-grey-0 dark:bg-grey-800 p-6 sm:p-10'>
          <Legend className='text-base/7 font-semibold text-grey-700 dark:text-grey-0'>
            Update user data
          </Legend>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              Email address
            </Label>
            <Input
              className={classNames(
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='email'
              autoComplete='email'
              required
              placeholder='someone@email.com'
              name='email'
              disabled
              defaultValue={user.email}
            />
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              Fullname
            </Label>
            <Description className='text-sm/6 text-grey-700 dark:text-white/50'>
              Please enter your full name.
            </Description>
            <Input
              className={classNames(
                state.errors?.fullName ? 'ring-red-500 dark:ring-red-500' : '',
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='text'
              autoComplete='name'
              required
              placeholder='Jhon Doe'
              name='fullName'
            />
            <Description className='text-sm text-red-500 mt-1'>
              {state.errors?.fullName}
            </Description>
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              Avatar Image
            </Label>
            <Description className='text-sm/6 text-grey-700 dark:text-white/50'>
              Please upload a new avatar image.
            </Description>
            <Input
              className={classNames(
                state.errors?.avatar ? 'ring-red-500 dark:ring-red-500' : '',
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='file'
              name='avatar'
              accept='image/*'
              required
            />
            <Description className='text-sm text-red-500 mt-1'>
              {state.errors?.avatar}
            </Description>
          </Field>
          <div className={'flex w-full justify-end gap-4'}>
            <Button
              type='reset'
              disabled={isPending || isTransition}
              className='inline-flex items-center gap-2 rounded-md bg-brand-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-brand-600 data-[open]:bg-brand-700 data-[focus]:outline-1 data-[focus]:outline-white capitalize disabled:bg-brand-200 disabled:cursor-not-allowed'>
              cancel
            </Button>
            <Button
              type='submit'
              disabled={isPending || isTransition}
              className='inline-flex items-center gap-2 rounded-md bg-brand-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-brand-600 data-[open]:bg-brand-700 data-[focus]:outline-1 data-[focus]:outline-white capitalize disabled:bg-brand-200 disabled:cursor-not-allowed'>
              Update account
            </Button>
          </div>
        </Fieldset>
      </div>
    </form>
  );
}
