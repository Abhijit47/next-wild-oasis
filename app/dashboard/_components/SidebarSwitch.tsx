'use client';

import { useSidebar } from '@/app/_contexts/SidebarContext';
import { HiMenuAlt2 } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';

export default function SidebarSwitch({
  status,
}: {
  status: 'open' | 'close';
}) {
  const { onToggle } = useSidebar();

  if (status === 'open') {
    return (
      <button
        type='button'
        className='px-4 border-r border-grey-200 dark:border-grey-600 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
        onClick={onToggle}>
        <span className='sr-only'>Open sidebar</span>
        <HiMenuAlt2 className='h-6 w-6' aria-hidden='true' />
      </button>
    );
  }

  return (
    <button
      type='button'
      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
      onClick={onToggle}>
      <span className='sr-only'>Close sidebar</span>
      <HiXMark className='h-6 w-6 text-white' aria-hidden='true' />
    </button>
  );
}
