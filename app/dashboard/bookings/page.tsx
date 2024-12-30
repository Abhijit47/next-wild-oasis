import SuspenseFallBack from '@/app/_components/shared/SuspenseFallBack';
import { Suspense } from 'react';

import DashboardMainContent from '../_components/DashboardMainContent';
import DashboardMainContentInner from '../_components/DashboardMainContentInner';
import DashboardMainContentShell from '../_components/DashboardMainContentShell';
import BookingTable from './_components/BookingTable';
import BookingTableOperations from './_components/BookingTableOperations';

export default async function BookingsPage(props: BookingsPageProps) {
  return (
    <DashboardMainContent>
      <DashboardMainContentInner>
        <BookingTableOperations />
        <DashboardMainContentShell>
          <Suspense fallback={<SuspenseFallBack />}>
            <BookingTable searchParams={props.searchParams} />
          </Suspense>
        </DashboardMainContentShell>
      </DashboardMainContentInner>
    </DashboardMainContent>
  );
}
