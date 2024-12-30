'use client';

import { useReservation } from '@/app/_contexts/ReservationContext';
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns';

import { DateRange, DayPicker } from 'react-day-picker';

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  if (!range.from || !range.to) {
    return false;
  }

  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! })
  );
}

function DateSelector(props: DateSelectorProps) {
  const { settings, bookedDates, cabin } = props;
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { from: undefined, to: undefined }
    : range;

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to!, displayRange.from!);
  const cabinPrice = numNights * (regularPrice - discount);
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='pt-12 place-self-center'
        mode='range'
        // onSelect={(date) => setRange(date as DateRange)}
        onSelect={(value) => {
          // console.log('date selected', value);
          setRange(value as DateRange);
        }}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        // fromMonth={new Date()}
        startMonth={new Date()}
        // fromDate={new Date()}
        // hidden={{ before: new Date() }}
        // toYear={new Date().getFullYear() + 5}
        endMonth={new Date(2025, 5)}
        captionLayout='dropdown'
        numberOfMonths={2}
        disabled={(currDate) =>
          isPast(currDate) ||
          bookedDates.some((date) => isSameDay(date, currDate))
        }
      />

      <div className='flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]'>
        <div className='flex items-baseline gap-6'>
          <p className='flex gap-2 items-baseline'>
            {discount > 0 ? (
              <>
                <span className='text-2xl'>${regularPrice - discount}</span>
                <span className='line-through font-semibold text-primary-700'>
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className='text-2xl'>${regularPrice}</span>
            )}
            <span className=''>/night</span>
          </p>
          {numNights ? (
            <>
              <p className='bg-accent-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>Total</span>{' '}
                <span className='text-2xl font-semibold'>${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className='border border-primary-800 py-2 px-4 text-sm font-semibold'
            onClick={resetRange}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
