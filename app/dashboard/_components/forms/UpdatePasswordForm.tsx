'use client';

import { UpdatePasswordFormInitialState } from '@/app/_constants';
import { updatePassword } from '@/app/_lib/services/user.services';
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
import { useActionState, useTransition } from 'react';
import { toast } from 'sonner';

export default function UpdatePasswordForm() {
  const [state, action, isPending] = useActionState(
    updatePassword,
    UpdatePasswordFormInitialState
  );
  const [isTransition, startTransition] = useTransition();

  function updatePasswordAction(formData: FormData) {
    startTransition(() => {
      action(formData);

      if (state.success) {
        toast.success(state.message);
        return;
      }

      if (!state.success) {
        toast.error("Couldn't create user");
        return;
      }
    });
  }

  return (
    <form action={updatePasswordAction}>
      <div className='w-full p-4'>
        <Fieldset className='space-y-6 rounded-xl bg-grey-0 dark:bg-grey-800 p-6 sm:p-10'>
          <Legend
            className={classNames(
              'text-grey-700 dark:text-grey-0',
              'text-base/7 font-semibold'
            )}>
            {state.message ? state.message : 'Update Password'}
          </Legend>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              New password (min 8+ characters)
            </Label>
            <div className={'relative'}>
              <Input
                className={classNames(
                  'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  'placeholder:dark:text-grey-400 placeholder:text-grey-500'
                )}
                type={'password'}
                autoComplete='new-password'
                name='password'
                required
                placeholder='password'
                defaultValue={
                  state.inputs?.password ? state.inputs.password : ''
                }
              />
            </div>
            <Description className='text-sm text-red-500 mt-1'>
              {state.errors?.password}
            </Description>
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              Confirm new password
            </Label>
            <Description className='text-sm/6 text-grey-700 dark:text-white/50'>
              Password must match the new password.
            </Description>
            <div className={'relative'}>
              <Input
                className={classNames(
                  'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  'placeholder:dark:text-grey-400 placeholder:text-grey-500',
                  'relative'
                )}
                type={'password'}
                name='confirmPassword'
                autoComplete='current-password'
                required
                placeholder='confirm password'
                defaultValue={
                  state.inputs?.confirmPassword
                    ? state.inputs.confirmPassword
                    : ''
                }
              />
            </div>
            <Description className='text-sm text-red-500 mt-1'>
              {state.errors?.confirmPassword}
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
              Update password
            </Button>
          </div>
        </Fieldset>
      </div>
    </form>
  );
}
