'use client';

import { Button } from '@headlessui/react';
import { useRouter } from 'next/navigation';

export default function CheckinButtons({
  bookingId,
  onCheckOut,
}: CheckinButtonsProps) {
  const router = useRouter();

  return (
    <div className={'flex items-center justify-end py-4 px-4 gap-4'}>
      <Button
        onClick={onCheckOut}
        className='inline-flex items-center gap-2 rounded-md bg-brand-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-brand-600 data-[open]:bg-brand-700 data-[focus]:outline-1 data-[focus]:outline-white'>
        {`Check in booking #${bookingId}`}
      </Button>
      <Button
        onClick={() => router.push('/dashboard/bookings')}
        className='inline-flex items-center gap-2 rounded-md bg-grey-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-grey-600 data-[open]:bg-grey-700 data-[focus]:outline-1 data-[focus]:outline-white'>
        Back
      </Button>
    </div>
  );
}
