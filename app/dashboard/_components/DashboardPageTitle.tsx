'use client';

import { usePathname } from 'next/navigation';

type DashboardPageTitleProps = {
  resourceName?: string;
  resourceId?: string;
};

export default function DashboardPageTitle({
  resourceName,
  resourceId,
}: DashboardPageTitleProps) {
  const pathname = usePathname();

  return (
    <h1 className='text-3xl font-bold capitalize text-grey-800 dark:text-grey-300'>
      {/* {pathname.split('/').pop()} */}
      {pathname === '/dashboard' && 'Dashboard'}
      {pathname.split('/').pop() === 'account' && 'Update your account'}
      {pathname.split('/').pop() === 'settings' && 'Update hotel settings'}
      {pathname.split('/').pop() === 'bookings' && 'All bookings'}
      {resourceName === 'Booking' && `Booking #${resourceId}`}
      {resourceName === 'Checkin' && `Check in booking #${resourceId}`}
      {pathname.split('/').pop() === 'cabins' && 'All cabins'}
      {pathname.split('/').pop() === 'users' && 'Create a new user'}
      {pathname.split('/').pop() === 'reports' && 'All reports'}
    </h1>
  );
}
