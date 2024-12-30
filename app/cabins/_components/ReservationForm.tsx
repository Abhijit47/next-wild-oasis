'use client';

import { createBookingInitialState } from '@/app/_constants';
import { useReservation } from '@/app/_contexts/ReservationContext';
import { createBooking } from '@/app/_lib/services/bookings.services';
import { classNames } from '@/app/_utils/helpers';
import {
  Button,
  Description,
  Field,
  Fieldset,
  Label,
  Legend,
  Select,
  Textarea,
} from '@headlessui/react';
import { differenceInDays } from 'date-fns';
import Image from 'next/image';
import { useActionState, useTransition } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { toast } from 'sonner';

type DumyUser = {
  name: string;
  email: string;
  image: string;
};

type ReservationFormProps = {
  cabin: Cabin;
  user: DumyUser;
};

export default function ReservationForm(props: ReservationFormProps) {
  const { cabin, user } = props;
  const [state, action, isPending] = useActionState(
    createBooking,
    createBookingInitialState
  );
  const [isTransition, startTransition] = useTransition();
  const { range, resetRange } = useReservation();

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate!, startDate!);
  const cabinPrice = numNights * (regularPrice - discount);

  function createBookingAction(formData: FormData) {
    formData.append('startDate', String(startDate));
    formData.append('endDate', String(endDate));
    formData.append('numNights', String(numNights));
    formData.append('cabinPrice', String(cabinPrice));
    formData.append('cabinId', String(id));

    startTransition(() => {
      action(formData);

      if (state.success) {
        toast.success(state.message);
        return;
      }

      if (!state.success) {
        toast.error("Couldn't create booking");
        return;
      }
    });

    resetRange();
  }

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        <div className='flex gap-4 items-center'>
          <Image
            // Important to display google profile images
            // referrerPolicy='no-referrer'
            className='size-8 rounded-full'
            src={user.image}
            alt={user.name}
            width={50}
            height={50}
          />
          <p>{user.name}</p>
        </div>
      </div>

      {/* <p>
        {String(range.from)} or {String(range.to)}
      </p> */}
      <div className='w-full'>
        <form action={createBookingAction}>
          <Fieldset className='space-y-6 rounded-xl p-6 sm:p-10'>
            <Legend className='text-base/7 font-semibold text-white'>
              Reservation Details
            </Legend>

            <Field>
              <Label className='text-sm/6 font-medium text-white'>
                How many guests?
              </Label>
              <Description className='text-xs text-white/50'>
                Including yourself, how many people will be staying?
              </Description>
              <div className='relative'>
                <Select
                  className={classNames(
                    'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                    // Make the text of each option black on Windows
                    '*:text-black'
                  )}
                  name='numGuests'>
                  <option value='' key=''>
                    Select number of guests...
                  </option>
                  {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
                    (x) => (
                      <option
                        value={x}
                        key={x}
                        defaultValue={
                          state.inputs?.numGuests ? state.inputs?.numGuests : 0
                        }>
                        {x} {x === 1 ? 'guest' : 'guests'}
                      </option>
                    )
                  )}
                </Select>
                <HiChevronDown
                  className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60'
                  aria-hidden='true'
                />
              </div>
              <Description className='text-xs text-red-500 mt-1'>
                {state && state.errors?.numGuests}
              </Description>
            </Field>
            <Field>
              <Label className='text-sm font-medium text-white'>
                Anything we should know about your stay?
              </Label>
              <Description className='text-xs text-white/50'>
                Any pets, allergies, special requirements, etc.?
              </Description>
              <Textarea
                className={classNames(
                  'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                )}
                rows={3}
                name='observations'
                defaultValue={
                  state.inputs?.observations ? state.inputs?.observations : ''
                }
              />
              <Description className='text-xs text-red-500 mt-1'>
                {state && state.errors?.observations}
              </Description>
            </Field>
            <div className='flex justify-end items-center gap-6'>
              {!(startDate && endDate) ? (
                <p className='text-primary-300 text-base'>
                  Start by selecting dates
                </p>
              ) : (
                <Button
                  type='submit'
                  disabled={isPending || isTransition}
                  className='inline-flex items-center gap-2 rounded-md bg-accent-500 py-1.5 px-3 text-sm/6 font-semibold text-accent-100 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-accent-600 data-[open]:bg-accent-500 data-[focus]:outline-1 data-[focus]:outline-accent-700 disabled:bg-accent-200 disabled:cursor-not-allowed'>
                  Reserve Now
                </Button>
              )}
            </div>
          </Fieldset>
        </form>
      </div>
      {/* <form
        // action={createBookingWithData}
        action={async (formData) => {
          // await createBookingWithData(formData);
          resetRange();
        }}
        className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required>
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          {!(startDate && endDate) ? (
            <p className='text-primary-300 text-base'>
              Start by selecting dates
            </p>
          ) : (
            <Button className='inline-flex items-center gap-2 rounded-md bg-accent-500 py-1.5 px-3 text-sm/6 font-semibold text-accent-100 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-accent-600 data-[open]:bg-accent-500 data-[focus]:outline-1 data-[focus]:outline-accent-700'>
              Reserve Now
            </Button>
          )}
        </div>
      </form> */}
    </div>
  );
}
