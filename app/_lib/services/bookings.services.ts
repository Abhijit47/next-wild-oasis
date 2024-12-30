'use server';

import { PAGE_SIZE } from '@/app/_constants';
import { getToday } from '@/app/_utils/helpers';
import { createClient } from '@/app/_utils/supabase/server';
import { PostgrestSingleResponse, UserResponse } from '@supabase/supabase-js';
import { eachDayOfInterval } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { bookingSchema } from '../schemas';
// import { redirect } from 'next/navigation';

export async function getBookings(
  params: GetBookingsParams
): Promise<{ data: Booking[]; count: number | null }> {
  const { filter, sortBy, page } = params;
  const supabase = await createClient();

  let query = supabase
    .from('bookings')
    .select(
      'id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice ,cabins(name), guests(fullName, email)',
      { count: 'exact' }
    );

  // FILTER
  // if (filter !== null) query = query.eq(filter.field, filter.value);
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  // SORT
  if (sortBy)
    query.order(sortBy.field, { ascending: sortBy.direction === 'asc' });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    query = query.range(from, to);
  }

  // QUERY
  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return JSON.parse(JSON.stringify({ data, count }));
}

// export async function getBookings() {
//   const { data, error } = await supabase
//     .from('bookings')
//     // .select('*, cabins(*), guests(*)');
//     // .select('*, cabins(name), guests(fullName, email)');
//     .select(
//       'id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice ,cabins(name), guests(fullName, email)'
//     );

//   if (error) {
//     console.error(error);
//     throw new Error('Bookings could not be loaded');
//   }

//   return data;
// }

export async function getBooking(id: number) {
  const supabase = await createClient();

  const { data, error } = (await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single()) as PostgrestSingleResponse<Booking>;

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date:ISO String
export async function getBookingsAfterDate(
  date: string
): Promise<BookingAfterDate[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(
  date: string
): Promise<StayAfterDate[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  console.log({ data });
  return data;
}

export async function getBookedDatesByCabinId(cabinId: number) {
  const supabase = await createClient();

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  // Getting all bookings
  const { data, error } = (await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(
      `startDate.gte.${todayISOString},status.eq.checked-in`
    )) as PostgrestSingleResponse<Booking[]>;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

type Country = {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
};

export async function getCountries() {
  try {
    const res = await fetch(
      // 'https://restcountries.com/v3/all?fields=name,flag'
      'https://countriesnow.space/api/v0.1/countries/flag/images'
    );

    if (!res.ok) {
      throw new Error('Could not fetch countries');
    }

    const countries = (await res.json()) as { data: Country[] };

    return countries.data;
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong while fetching countries');
  }
}

export async function createBooking(
  _: CreateBookingResponse,
  formData: FormData
): Promise<CreateBookingResponse> {
  try {
    // const session = await auth();
    // if (!session) {
    //   throw new Error('You must be logged in.');
    // }
    // console.log(Object.fromEntries(formData.entries()));
    const rawData: CreateBookingFormData = {
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      numNights: Number(formData.get('numNights') as string),
      cabinPrice: Number(formData.get('cabinPrice') as string),
      cabinId: Number(formData.get('cabinId') as string),
      numGuests: Number(formData.get('numGuests') as string),
      observations: String(formData.get('observations') as string),
    };

    const validateData = bookingSchema.safeParse(rawData);

    if (!validateData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validateData.error.flatten().fieldErrors,
        inputs: {
          numGuests: rawData.numGuests,
          observations: rawData.observations,
        },
      };
    }

    // console.log('Data', validateData.data);

    const supabase = await createClient();

    const { data, error } = (await supabase.auth.getUser()) as UserResponse;

    if (error) {
      console.error('You must be logged in!!!', error);
      return {
        success: false,
        message: 'You must be logged in',
      };
    }

    console.log('user', JSON.stringify(data.user, null, 2));

    // const newBooking = {
    //   ...bookingData,
    //   // guestId: session.user.guestId,
    //   numGuests: Number(formData.get('numGuests')),
    //   observations: String(formData.get('observations')).slice(0, 1000),
    //   extrasPrice: 0,
    //   totalPrice: bookingData.cabinPrice,
    //   isPaid: false,
    //   hasBreakfast: false,
    //   status: 'unconfirmed',
    // };

    const newBooking = {
      ...validateData.data,
      guestId: data.user.id,
      extrasPrice: 0,
      totalPrice: validateData.data.cabinPrice,
      isPaid: false,
      hasBreakfast: false,
      status: 'unconfirmed',
    };

    console.log(newBooking);

    // const { error } = (await supabase
    //   .from('bookings')
    //   .insert([newBooking])) as PostgrestSingleResponse<Booking>;

    // if (error) {
    //   console.error(error);
    //   // throw new Error('Booking could not be created');
    //   return {
    //     success: false,
    //     message: 'Booking could not be created',
    //   };
    // }

    revalidatePath(`/cabins/${validateData.data.cabinId}`);
    return {
      success: true,
      message: 'Booking created successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Something went wrong',
    };
  } finally {
    // redirect('/cabins/thankyou');
  }
}

export async function updateBooking(id: number, obj: UpdateBookingParamsObj) {
  const supabase = await createClient();

  const { data, error } = (await supabase
    .from('bookings')
    .update([{ isPaid: obj.isPaid, status: obj.status, ...obj.breakfast }])
    .eq('id', id)
    .select()
    .single()) as PostgrestSingleResponse<Booking>;

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  revalidatePath('/dashboard/bookings');
  return data;
}

export async function deleteBooking(id: number) {
  const supabase = await createClient();

  // REMEMBER RLS POLICIES
  const { data, error } = (await supabase
    .from('bookings')
    .delete()
    .eq('id', id)) as PostgrestSingleResponse<Booking>;

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
