'use client';

// import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import ButtonForTest from './ButtonForTest';
// import ThemeSwitch from './ThemeSwitch';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { HiMenu } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';
import { classNames } from '../_utils/helpers';
import ThemeMenu from '../dashboard/_components/ThemeMenu';
import Logo from './Logo';

const user = {
  name: 'Chelsea Hagon',
  email: 'chelseahagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'About', href: '/about', current: true },
  { name: 'Cabins', href: '/cabins', current: false },
  { name: 'Teams', href: '#', current: false },
  { name: 'Directory', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

export default function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) {
    return null;
  }
  {
    /* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */
  }

  return (
    <Popover
      as='header'
      className={({ open }) =>
        classNames(
          'py-4',
          open ? 'sticky z-40 overflow-y-auto' : '',
          'bg-transparent dark:bg-grey-800 shadow-sm lg:sticky lg:overflow-y-visible'
        )
      }>
      {({ open }) => (
        <>
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8'>
              <div className='flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2'>
                <div className='flex items-center flex-shrink-0'>
                  <Link href='/'>
                    <Logo className='w-auto h-14' />
                  </Link>
                </div>
              </div>
              <div className='flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden'>
                {/* Mobile menu button */}
                <PopoverButton className='inline-flex items-center justify-center p-2 -mx-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open menu</span>
                  {open ? (
                    <HiXMark className='block w-6 h-6' aria-hidden='true' />
                  ) : (
                    <HiMenu className='block w-6 h-6' aria-hidden='true' />
                  )}
                </PopoverButton>
              </div>
              <div className='hidden lg:flex lg:items-center lg:justify-end xl:col-span-10'>
                <div className='flex justify-center flex-1 w-full gap-4'>
                  {/* {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'hover:bg-gray-50',
                          'block rounded-md py-2 px-3 text-base font-medium'
                        )}>
                        {item.name}
                      </Link>
                    ))} */}
                  <NavLinks />
                </div>

                <ThemeMenu />

                {/* Profile dropdown */}
                <Menu as='div' className='relative flex-shrink-0 ml-5'>
                  <div>
                    <MenuButton className='flex bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      <span className='sr-only'>Open user menu</span>
                      <Image
                        className='w-8 h-8 rounded-full'
                        src={'/default-user.jpg'}
                        alt='user-avatar'
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
                    <MenuItems className='absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ focus }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                focus ? 'bg-gray-100' : '',
                                'block py-2 px-4 text-sm text-gray-700'
                              )}>
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>

                <Link
                  href='/dashboard'
                  className='inline-flex items-center px-4 py-2 ml-6 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  Dashboard
                </Link>
              </div>
            </div>
          </div>

          <PopoverPanel
            as='nav'
            className='w-full h-full mt-8 overflow-y-scroll transform rounded-lg shadow-lg lg:hidden bg-transparent dark:bg-grey-800'
            aria-label='Global'>
            <div className='max-w-3xl px-2 pt-2 pb-3 mx-auto space-y-1 sm:px-4'>
              <NavLinks />
            </div>
            <div className='pt-4 pb-3 border-t border-gray-200'>
              <div className='flex items-center max-w-3xl px-4 mx-auto sm:px-6'>
                <div className='flex-shrink-0'>
                  <Image
                    className='w-8 h-8 rounded-full'
                    src={'/default-user.jpg'}
                    alt='user-avatar'
                    width={100}
                    height={100}
                  />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-gray-800'>
                    {user.name}
                  </div>
                  <div className='text-sm font-medium text-gray-500'>
                    {user.email}
                  </div>
                </div>
                <ThemeMenu />
              </div>
              <div className='max-w-3xl px-2 mx-auto mt-3 space-y-1 sm:px-4'>
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900'>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          aria-current={item.href ? 'page' : undefined}
          className={classNames(
            item.href === pathname
              ? 'bg-gray-100 text-gray-900'
              : 'hover:bg-gray-50',
            'block rounded-md py-2 px-3 text-base font-medium'
          )}>
          {item.name}
        </Link>
      ))}
    </>
  );
}
