'use client';

import { useSidebar } from '@/app/_contexts/SidebarContext';
import {
  Dialog,
  DialogBackdrop,
  Transition,
  TransitionChild,
  useClose,
} from '@headlessui/react';
import { Fragment } from 'react';
import SidebarLinks from './SidebarLinks';
import SidebarLogo from './SidebarLogo';
import SidebarSwitch from './SidebarSwitch';

export default function SidebarDrawer() {
  const { isSidebarOpen, onToggle } = useSidebar();
  const close = useClose();

  return (
    <Transition show={isSidebarOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 flex z-40 md:hidden'
        onClose={onToggle}>
        <TransitionChild
          onClick={close}
          as={'div'}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <DialogBackdrop className='fixed inset-0 bg-gray-600 bg-opacity-75' />
        </TransitionChild>
        <TransitionChild
          as={Fragment}
          enter='transition ease-in-out duration-300 transform'
          enterFrom='-translate-x-full'
          enterTo='translate-x-0'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='translate-x-0'
          leaveTo='-translate-x-full'>
          <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-grey-0 dark:bg-gray-800'>
            <TransitionChild
              as={Fragment}
              enter='ease-in-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in-out duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='absolute top-0 right-0 -mr-12 pt-2'>
                <SidebarSwitch status='close' />
              </div>
            </TransitionChild>

            <SidebarLogo />
            <aside className='mt-5 flex-1 h-0 overflow-y-auto'>
              <nav className='px-2 space-y-1'>
                <SidebarLinks />
              </nav>
            </aside>
          </div>
        </TransitionChild>
        <div className='flex-shrink-0 w-14' aria-hidden='true'>
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition>
  );
}
