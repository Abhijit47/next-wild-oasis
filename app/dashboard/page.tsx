import { subDays } from 'date-fns';
import { unauthorized } from 'next/navigation';
import { Suspense } from 'react';
import SuspenseFallBack from '../_components/shared/SuspenseFallBack';
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from '../_lib/services/bookings.services';
import { getCabins } from '../_lib/services/cabins.services';
import { createClient } from '../_utils/supabase/server';
import DashboardFilter from './_components/DashboardFilter';
import DashboardMainContent from './_components/DashboardMainContent';
import DashboardMainContentInner from './_components/DashboardMainContentInner';
import DashboardMainContentShell from './_components/DashboardMainContentShell';
import DashboardPageTitle from './_components/DashboardPageTitle';
import Stats from './_components/Stats';
import TodayActivity from './_components/TodayActivity';
import { DurationChart, SalesChart } from './_components/charts';

export default async function DashboardPage(props: DashboardPageProps) {
  const { searchParams } = props;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return unauthorized();
  }

  const numDays = (await searchParams).last
    ? Number((await searchParams).last)
    : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const bookings = await getBookingsAfterDate(queryDate);
  const cabins = await getCabins();
  const stays = await getStaysAfterDate(queryDate);

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  );

  return (
    <DashboardMainContent>
      <DashboardMainContentInner>
        <div className='flex items-center justify-between'>
          <DashboardPageTitle />
          <DashboardFilter />
        </div>
        <DashboardMainContentShell className={'space-y-8'}>
          <Stats
            bookings={bookings}
            confirmedStays={confirmedStays}
            numDays={numDays}
            cabinCount={cabins.length}
          />

          <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
            <Suspense fallback={<SuspenseFallBack />}>
              <TodayActivity />
            </Suspense>
            <DurationChart confirmedStays={confirmedStays} />
          </div>

          <div className={'grid grid-cols-1'}>
            <SalesChart bookings={bookings} numDays={numDays} />
          </div>
        </DashboardMainContentShell>
      </DashboardMainContentInner>
    </DashboardMainContent>
  );
}
