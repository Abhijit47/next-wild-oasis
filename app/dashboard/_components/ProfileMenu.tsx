'use client';

import { dashboardUserNavigation } from '@/app/_constants';
import { classNames } from '@/app/_utils/helpers';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

export default function ProfileMenu({ user }: { user: User }) {
  const { fullName, avatar } = user.user_metadata;

  return (
    <Menu as='div' className='ml-3 relative'>
      <div className={'flex items-center gap-1'}>
        <span className={'text-grey-700 dark:text-grey-0 text-sm capitalize'}>
          {fullName}
        </span>
        <MenuButton className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <span className='sr-only'>Open user menu</span>
          <Image
            className='h-8 w-8 rounded-full'
            src={avatar ? avatar : '/default-user.jpg'}
            alt='user-profile'
            width={100}
            height={100}
          />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <MenuItems className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {dashboardUserNavigation.map((item) => (
            <MenuItem key={item.name}>
              {({ focus }) => (
                <Link
                  href={item.href}
                  className={classNames(
                    focus ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}>
                  {item.name}
                </Link>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
