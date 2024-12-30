// import ThemeSwitch from '@/app/_components/ThemeSwitch';
// import DashboardNotificationButton from './DashboardNotificationButton';
import { getUser } from '@/app/_lib/services/user.services';
import { unauthorized } from 'next/navigation';
import DashboardSearchForm from './DashboardSearchForm';
import ProfileMenu from './ProfileMenu';
import SidebarSwitch from './SidebarSwitch';
import ThemeMenu from './ThemeMenu';

export default async function DashboardHeader() {
  const user = await getUser();

  if (!user) {
    unauthorized();
  }

  return (
    <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-grey-0 dark:bg-gray-800 shadow'>
      <SidebarSwitch status='open' />
      <div className='flex-1 px-4 flex justify-between'>
        <DashboardSearchForm />
        <div className='ml-4 flex items-center md:ml-6'>
          {/* Notification button */}
          {/* <DashboardNotificationButton /> */}
          <ThemeMenu />
          {/* <ThemeSwitch /> */}

          {/* Profile dropdown */}
          <ProfileMenu user={user} />
        </div>
      </div>
    </div>
  );
}
