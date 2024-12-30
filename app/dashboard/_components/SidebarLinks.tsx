'use client';

import { dashboardNavigation } from '@/app/_constants';
import { classNames } from '@/app/_utils/helpers';
import { useClose } from '@headlessui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarLinks() {
  const pathname = usePathname();
  const close = useClose();

  return (
    <>
      {dashboardNavigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            item.href === pathname
              ? 'bg-grey-100 text-grey-900 dark:bg-grey-700 dark:text-grey-0'
              : 'text-grey-600 hover:bg-grey-50 hover:dark:bg-grey-600 hover:text-grey-900 hover:dark:text-grey-300',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
          )}
          onClick={close}>
          <item.icon
            className={classNames(
              item.href === pathname
                ? 'text-grey-500 dark:text-grey-300'
                : 'text-grey-400 dark:text-grey-0 group-hover:text-gray-500 group-hover:dark:text-grey-300',
              'mr-3 flex-shrink-0 h-6 w-6'
            )}
            aria-hidden='true'
          />
          {item.name}
        </Link>
      ))}
    </>
  );
}
