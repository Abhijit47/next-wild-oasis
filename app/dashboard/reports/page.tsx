import { Button } from '@headlessui/react';
import DashboardMainContent from '../_components/DashboardMainContent';
import DashboardMainContentInner from '../_components/DashboardMainContentInner';
import DashboardMainContentShell from '../_components/DashboardMainContentShell';
import DashboardPageTitle from '../_components/DashboardPageTitle';

export default function ReportsPage() {
  return (
    <DashboardMainContent>
      <DashboardMainContentInner>
        <DashboardPageTitle />
        <DashboardMainContentShell>
          <Button className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'>
            Save changes
          </Button>
        </DashboardMainContentShell>
      </DashboardMainContentInner>
    </DashboardMainContent>
  );
}
