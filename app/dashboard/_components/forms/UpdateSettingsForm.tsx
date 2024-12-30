'use client';

import { UpdateSettingsFormInitialState } from '@/app/_constants';
import { updateSettings } from '@/app/_lib/services/settings.services';
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

export default function UpdateSettingsForm(props: UpdateSettingsFormProps) {
  const { prevSettings } = props;
  const [state, action, isPending] = useActionState(
    updateSettings,
    UpdateSettingsFormInitialState
  );
  const [isTransition, startTransition] = useTransition();

  function updateSettingsAction(formData: FormData) {
    startTransition(() => {
      action(formData);

      if (state.success) {
        toast.success(state.message);
        return;
      }

      if (!state.success) {
        toast.error("Couldn't update settings");
        return;
      }
    });
  }

  return (
    <form action={updateSettingsAction}>
      <div className='w-full p-4'>
        <Fieldset className='p-6 space-y-6 rounded-xl bg-grey-0 dark:bg-grey-800 sm:p-10'>
          <Legend className='font-semibold text-base/7 text-grey-700 dark:text-grey-0'>
            Hotel settings
          </Legend>
          <Field>
            <Label className='font-medium text-sm/6 text-grey-700 dark:text-grey-0'>
              Minimum nights/booking
            </Label>
            <Input
              className={classNames(
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='text'
              name='minBookingLength'
              placeholder='2'
              required
              defaultValue={
                state.inputs?.minBookingLength
                  ? state.inputs.minBookingLength
                  : prevSettings.minBookingLength
              }
            />
            <Description className='mt-1 text-sm text-red-500'>
              {state.errors?.minBookingLength}
            </Description>
          </Field>
          <Field>
            <Label className='font-medium text-sm/6 text-grey-700 dark:text-grey-0'>
              Maximum nights/booking
            </Label>
            <Input
              className={classNames(
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='text'
              name='maxBookingLength'
              placeholder='10'
              required
              defaultValue={
                state.inputs?.maxBookingLength
                  ? state.inputs.maxBookingLength
                  : prevSettings.maxBookingLength
              }
            />
            <Description className='mt-1 text-sm text-red-500'>
              {state.errors?.maxBookingLength}
            </Description>
          </Field>
          <Field>
            <Label className='font-medium text-sm/6 text-grey-700 dark:text-grey-0'>
              Maximum guests/booking
            </Label>
            <Input
              className={classNames(
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='text'
              name='maxGuestsPerBooking'
              placeholder='8'
              required
              defaultValue={
                state.inputs?.maxGuestsPerBooking
                  ? state.inputs.maxGuestsPerBooking
                  : prevSettings.maxGuestsPerBooking
              }
            />
            <Description className='mt-1 text-sm text-red-500'>
              {state.errors?.maxGuestsPerBooking}
            </Description>
          </Field>
          <Field>
            <Label className='font-medium text-sm/6 text-grey-700 dark:text-grey-0'>
              Breakfast price
            </Label>
            <Input
              className={classNames(
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='text'
              name='breakfastPrice'
              placeholder='15'
              required
              defaultValue={
                state.inputs?.breakfastPrice
                  ? state.inputs.breakfastPrice
                  : prevSettings.breakfastPrice
              }
            />
            <Description className='mt-1 text-sm text-red-500'>
              {state.errors?.breakfastPrice}
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
              Update settings
            </Button>
          </div>
        </Fieldset>
      </div>
    </form>
  );
}
