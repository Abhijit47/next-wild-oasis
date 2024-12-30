'use client';

import { ModalContext } from '@/app/_contexts/ModalContext';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import { use } from 'react';
import {
  HiArchiveBoxXMark,
  HiArrowDownOnSquare,
  HiEllipsisVertical,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { toast } from 'sonner';

export default function BookingRowDropDown(props: BookingRowDropDownProps) {
  const { booking, onCheckOut } = props;
  const { onToggleDelete } = use(ModalContext);

  async function handleCheckOut() {
    const result = await onCheckOut(booking.id, { status: 'checked-out' });

    if (result.id) {
      toast.success('Checked out successfully');
      return;
    }

    if (!result.id) {
      toast.error('Could not check out');
      return;
    }
  }

  return (
    <div className='w-fit'>
      <Menu __demoMode={false}>
        <MenuButton className='inline-flex items-center gap-2 rounded-md bg-grey-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-grey-700 data-[open]:bg-grey-700 data-[focus]:outline-1 data-[focus]:outline-white'>
          <span className={'sr-only'}>Options</span>
          <span>
            <HiEllipsisVertical className={'size-4'} />
          </span>
        </MenuButton>

        <MenuItems
          transition
          anchor='bottom end'
          className='w-52 origin-top-right rounded-xl border border-brand-700 dark:border-brand-50 bg-grey-0 dark:bg-grey-800 p-1 text-sm/6 text-grey-700 dark:text-grey-0 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'>
          <MenuItem>
            <Link
              href={`bookings/${booking.id}`}
              className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-grey-100 data-[focus]:dark:bg-grey-600 disabled:cursor-not-allowed'>
              <HiEye className='size-4 fill-grey-700 dark:fill-grey-500' />
              See Details
              <kbd className='ml-auto hidden font-sans text-xs text-grey-700 dark:text-grey-0 group-data-[focus]:inline'>
                ⌘E
              </kbd>
            </Link>
          </MenuItem>
          {booking.status === 'unconfirmed' && (
            <MenuItem>
              <Link
                href={`checkin/${booking.id}`}
                className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-grey-100 data-[focus]:dark:bg-grey-600'>
                <HiArrowDownOnSquare className='size-4 fill-grey-700 dark:fill-grey-500' />
                Check in
                <kbd className='ml-auto hidden font-sans text-xs text-grey-700 dark:text-grey-0 group-data-[focus]:inline'>
                  ⌘D
                </kbd>
              </Link>
            </MenuItem>
          )}
          <div className='h-px my-1 bg-grey-200 dark:bg-grey-400' />
          {booking.status === 'checked-in' && (
            <MenuItem>
              <button
                onClick={handleCheckOut}
                className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-grey-100 data-[focus]:dark:bg-grey-600'>
                <HiArchiveBoxXMark className='size-4 fill-grey-700 dark:fill-grey-500' />
                Check out
                <kbd className='ml-auto hidden font-sans text-xs text-grey-700 dark:text-grey-0 group-data-[focus]:inline'>
                  ⌘A
                </kbd>
              </button>
            </MenuItem>
          )}
          <MenuItem>
            <button
              onClick={() => {
                onToggleDelete();
              }}
              className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-grey-100 data-[focus]:dark:bg-grey-600'>
              <HiTrash className='size-4 fill-grey-700 dark:fill-grey-500' />
              Delete
              <kbd className='ml-auto hidden font-sans text-xs text-grey-700 dark:text-grey-0 group-data-[focus]:inline'>
                ⌘D
              </kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
