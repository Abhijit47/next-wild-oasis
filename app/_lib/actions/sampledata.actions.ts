'use server';

import { subtractDates } from '@/app/_utils/helpers';
import { createClient } from '@/app/_utils/supabase/server';
import { bookings } from '@/data/data-bookings';
import { cabins } from '@/data/data-cabins';
import { guests } from '@/data/data-guests';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { isFuture, isPast, isToday } from 'date-fns';

async function deleteGuests() {
  const supabase = await createClient();

  const { error } = await supabase.from('guests').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const supabase = await createClient();

  const { error } = await supabase.from('cabins').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const supabase = await createClient();

  const { error } = await supabase.from('bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const supabase = await createClient();

  const { error } = await supabase.from('guests').insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const supabase = await createClient();

  const { error } = await supabase.from('cabins').insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const supabase = await createClient();

  const { data: guestsIds, error: guestsIdsError } = (await supabase
    .from('guests')
    .select('id')
    .order('id')) as PostgrestSingleResponse<{ id: number }[]>;

  if (guestsIdsError) console.log(guestsIdsError.message);

  const allGuestIds = guestsIds?.map((cabin) => cabin.id);
  const { data: cabinsIds, error: cabinIdsError } = (await supabase
    .from('cabins')
    .select('id')
    .order('id')) as PostgrestSingleResponse<{ id: number }[]>;

  if (cabinIdsError) console.log(cabinIdsError.message);

  const allCabinIds = cabinsIds?.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(
      new Date(booking.endDate),
      new Date(booking.startDate)
    );
    const cabinPrice = cabin
      ? numNights * (cabin.regularPrice - cabin.discount)
      : 0;
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status: 'checked-out' | 'unconfirmed' | 'checked-in' = 'unconfirmed';
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = 'checked-out';
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed';
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in';

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds?.at(booking.guestId - 1),
      cabinId: allCabinIds?.at(booking.cabinId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from('bookings').insert(finalBookings);
  if (error) console.log(error.message);
}

export async function uploadAll() {
  // Bookings need to be deleted FIRST
  // await deleteBookings();
  // await deleteGuests();
  // await deleteCabins();
  await Promise.all([deleteBookings, deleteGuests, deleteCabins]);

  // Bookings need to be created LAST
  // await createGuests();
  // await createCabins();
  // await createBookings();
  await Promise.all([createGuests, createCabins, createBookings]);
}

export async function uploadBookings() {
  // await deleteBookings();
  // await createBookings();
  await Promise.all([deleteBookings, createBookings]);
}
