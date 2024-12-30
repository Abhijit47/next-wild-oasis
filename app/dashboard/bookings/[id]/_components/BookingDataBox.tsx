import { ModalProvider } from '@/app/_contexts/ModalContext';
import {
  deleteBooking,
  updateBooking,
} from '@/app/_lib/services/bookings.services';
import {
  classNames,
  formatCurrency,
  formatDistanceFromNow,
} from '@/app/_utils/helpers';
import DeleteModal from '@/app/dashboard/_components/shared/DeleteModal';
import { format, isToday } from 'date-fns';
import Image from 'next/image';
import {
  HiCalendarDateRange,
  HiHomeModern,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
} from 'react-icons/hi2';
import BookingButtons from './BookingButtons';

export default function BookingDataBox({ booking }: { booking: Booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    cabins: { name: cabinName },
    guests: { countryFlag, country, email, fullName: guestName, nationalID },
  } = booking;

  return (
    <div className={'space-y-8'}>
      <div
        className={
          'bg-brand-500 text-grey-0 py-6 font-bold px-4 rounded-lg flex flex-wrap items-center justify-between'
        }>
        <div className={'flex items-center gap-4'}>
          <HiHomeModern className={'size-8'} />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>
        <div className={'flex items-center gap-4'}>
          <span>
            <HiCalendarDateRange className={'size-8'} />
          </span>
          <span>
            {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
            {isToday(new Date(startDate))
              ? 'Today'
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
          </span>
        </div>
      </div>

      {/*  */}
      <div className={'flex flex-wrap items-center gap-8 py-4 px-4'}>
        {countryFlag && (
          <Image
            src={countryFlag}
            alt={`Flag of ${country}`}
            width={20}
            height={20}
            className={'size-8'}
          />
        )}
        <p>
          {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
        </p>
        <span>&bull;</span>
        <p>{email}</p>
        <span>&bull;</span>
        <p>National ID {nationalID}</p>
      </div>

      {observations && (
        <div className={'flex items-center gap-4 py-4 px-4'}>
          <span>
            {<HiOutlineChatBubbleBottomCenterText className={'size-8'} />}
          </span>
          <span>Observations:</span>
          <span>{observations}</span>
        </div>
      )}

      {hasBreakfast && (
        <div className={'flex items-center gap-4 py-4 px-4'}>
          <span>
            <HiOutlineCheckCircle className={'size-6'} />
          </span>
          <span>Breakfast included? </span>
          {hasBreakfast ? 'Yes' : 'No'}
        </div>
      )}

      <div
        className={classNames(
          isPaid ? 'bg-green-100' : 'bg-yellow-100',
          isPaid ? 'text-green-700' : 'text-yellow-700',
          'flex flex-wrap items-center justify-between gap-4 py-4 px-4 rounded-lg'
        )}>
        <div className={'flex flex-wrap items-center gap-4'}>
          <span>
            <HiOutlineCurrencyDollar className={'size-6'} />
          </span>
          <p>
            Total price
            <span>{formatCurrency(totalPrice)}</span>
          </p>
          <span>
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </span>
        </div>
        <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
      </div>

      <div className={'py-4 flex items-center justify-end'}>
        <p className={'text-xs'}>
          Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
        </p>
      </div>

      <ModalProvider>
        <BookingButtons bookingId={booking.id} onCheckOut={updateBooking} />
        <DeleteModal
          resourceName='booking'
          resourceId={booking.id}
          onConfirm={deleteBooking}
        />
      </ModalProvider>
    </div>
  );
}
