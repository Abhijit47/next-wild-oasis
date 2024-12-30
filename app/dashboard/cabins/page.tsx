import SuspenseFallBack from '@/app/_components/shared/SuspenseFallBack';
import { ModalProvider } from '@/app/_contexts/ModalContext';
import { Suspense } from 'react';
import DashboardMainContent from '../_components/DashboardMainContent';
import DashboardMainContentInner from '../_components/DashboardMainContentInner';
import DashboardMainContentShell from '../_components/DashboardMainContentShell';
import AddNewCabinButton from './_components/AddNewCabinButton';
import CabinsTable from './_components/CabinsTable';
import CabinTableOperations from './_components/CabinTableOperations';

export default async function CabinsPage(props: CabinsPageProps) {
  return (
    <DashboardMainContent>
      <DashboardMainContentInner>
        <CabinTableOperations />
        <DashboardMainContentShell className={'space-y-8'}>
          <Suspense fallback={<SuspenseFallBack />}>
            <CabinsTable searchParams={props.searchParams} />
          </Suspense>

          <ModalProvider>
            <AddNewCabinButton />
          </ModalProvider>
        </DashboardMainContentShell>
      </DashboardMainContentInner>
    </DashboardMainContent>
  );
}
