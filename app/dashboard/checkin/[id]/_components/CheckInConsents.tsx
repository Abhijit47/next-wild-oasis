'use client';

import { updateBooking } from '@/app/_lib/services/bookings.services';
import { formatCurrency } from '@/app/_utils/helpers';
import { Checkbox } from '@headlessui/react';
import { useState } from 'react';
import { HiCheck } from 'react-icons/hi2';
import { toast } from 'sonner';
import CheckinButtons from './CheckinButtons';

export default function CheckInConsents({
  booking,
  optionalBreakfastPrice,
}: {
  booking: Booking;
  optionalBreakfastPrice: number;
}) {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  // useEffect(() => {
  //   setConfirmPaid(booking?.isPaid || false);
  // }, [booking]);

  async function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      const result = await updateBooking(booking.id, {
        status: 'checked-in',
        isPaid: true,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: booking.totalPrice + optionalBreakfastPrice,
        },
      });
      if (result.id) {
        toast.success('Checked in successfully');
        return;
      }

      if (!result.id) {
        toast.error('Could not check ins.');
        return;
      }
    } else {
      const result = await updateBooking(booking.id, {
        status: 'checked-in',
        isPaid: true,
      });
      if (result.id) {
        toast.success('Checked in successfully');
        return;
      }

      if (!result.id) {
        toast.error('Could not check ins.');
        return;
      }
    }
  }

  return (
    <div className={'space-y-8'}>
      <div>
        {!booking.hasBreakfast && (
          <div className={'bg-grey-0 px-4 py-4 rounded-lg'}>
            <div className={'flex items-center gap-4'}>
              <Checkbox
                checked={addBreakfast}
                onChange={() => {
                  setAddBreakfast((add) => !add);
                  setConfirmPaid(false);
                }}
                id={'breakfast'}
                className='group size-6 rounded-md bg-grey-100 dark:bg-grey-0 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-grey-200'>
                <HiCheck className='hidden size-4 fill-black group-data-[checked]:block' />
              </Checkbox>
              <p
                onClick={() => {
                  setAddBreakfast((add) => !add);
                  setConfirmPaid(false);
                }}
                className='cursor-pointer select-none text-sm/6'>
                Want to add breakfast for ${' '}
                {formatCurrency(optionalBreakfastPrice)}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className={'bg-grey-0 px-4 py-4 rounded-lg'}>
        <div className={'flex items-center gap-4'}>
          <Checkbox
            checked={confirmPaid}
            onChange={() => setConfirmPaid((confirm) => !confirm)}
            id='consent'
            disabled={confirmPaid}
            className='group size-6 rounded-md bg-grey-100 dark:bg-grey-0 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-grey-200'>
            <HiCheck className='hidden size-4 fill-black group-data-[checked]:block' />
          </Checkbox>
          <p
            onClick={() => setConfirmPaid((confirm) => !confirm)}
            className='cursor-pointer select-none text-sm/6'>
            I confirm that {booking.guests.fullName} has paid the total amount
            of{' '}
            {!addBreakfast
              ? formatCurrency(booking.totalPrice)
              : `${formatCurrency(
                  booking.totalPrice + optionalBreakfastPrice
                )} (${formatCurrency(booking.totalPrice)} +
                ${formatCurrency(optionalBreakfastPrice)})`}
          </p>
        </div>
      </div>

      <CheckinButtons bookingId={booking.id} onCheckOut={handleCheckin} />
    </div>
  );
}
