'use client';

import { ModalContext } from '@/app/_contexts/ModalContext';
import { Button } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { toast } from 'sonner';

export default function BookingButtons({
  bookingId,
  onCheckOut,
}: BookingButtonsProps) {
  const { onToggleDelete } = use(ModalContext);
  const router = useRouter();

  async function handleCheckOut() {
    const result = await onCheckOut(bookingId, { status: 'checked-out' });

    if (result.id) {
      toast.success('Checked out successfully');
      return;
    }

    if (!result.id) {
      toast.error('Could not check out');
      return;
    }
  }

  return (
    <div className={'flex items-center justify-end py-4 px-4 gap-4'}>
      <Button
        onClick={handleCheckOut}
        className='inline-flex items-center gap-2 rounded-md bg-brand-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-brand-600 data-[open]:bg-brand-700 data-[focus]:outline-1 data-[focus]:outline-white'>
        Check in
      </Button>
      <Button
        onClick={onToggleDelete}
        className='inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[open]:bg-red-700 data-[focus]:outline-1 data-[focus]:outline-white'>
        Delete
      </Button>
      <Button
        onClick={() => router.push('/dashboard/bookings')}
        className='inline-flex items-center gap-2 rounded-md bg-grey-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-grey-600 data-[open]:bg-grey-700 data-[focus]:outline-1 data-[focus]:outline-white'>
        Back
      </Button>
    </div>
  );
}
