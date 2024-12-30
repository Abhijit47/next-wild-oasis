'use client';

import { createCabinInitialState } from '@/app/_constants';
import { ModalContext } from '@/app/_contexts/ModalContext';
import { createCabin } from '@/app/_lib/services/cabins.services';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  useClose,
} from '@headlessui/react';
import { use, useActionState, useTransition } from 'react';
import {
  // HiArchiveBox,
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from 'react-icons/hi2';
import { toast } from 'sonner';

export default function CabinDropDown({ cabin }: { cabin: Cabin }) {
  const [state, action, isPending] = useActionState(
    createCabin,
    createCabinInitialState
  );
  const [isTransition, startTransition] = useTransition();

  const close = useClose();
  const { onToggle, onToggleDelete } = use(ModalContext);

  function createCabinDuplicateAction() {
    const { name, maxCapacity, regularPrice, discount, image, description } =
      cabin;

    const formData = new FormData();
    formData.append('name', `Copy of ${name}`);
    formData.append('maxCapacity', String(maxCapacity));
    formData.append('regularPrice', String(regularPrice));
    formData.append('discount', String(discount));
    formData.append('image', image);
    formData.append('description', description);

    startTransition(() => {
      action(formData);

      if (state.success) {
        toast.success(state.message);
        close();
        return;
      }

      if (!state.success) {
        toast.error('Something went wrong while creating a duplicate cabin.');
        close();
        return;
      }

      console.log({ state });
      // close();
    });
  }

  return (
    <div className='w-fit'>
      <Menu __demoMode={false} as={'div'}>
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
            <button
              type='button'
              onClick={createCabinDuplicateAction}
              disabled={isPending || isTransition}
              className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-grey-100 data-[focus]:dark:bg-grey-600 disabled:cursor-not-allowed'>
              <HiSquare2Stack className='size-4 fill-grey-700 dark:fill-grey-500' />
              Duplicate
              <kbd className='ml-auto hidden font-sans text-xs text-grey-700 dark:text-grey-0 group-data-[focus]:inline'>
                ⌘D
              </kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => {
                onToggle();
              }}
              className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-grey-100 data-[focus]:dark:bg-grey-600'>
              <HiPencil className='size-4 fill-grey-700 dark:fill-grey-500' />
              Edit
              <kbd className='ml-auto hidden font-sans text-xs text-grey-700 dark:text-grey-0 group-data-[focus]:inline'>
                ⌘E
              </kbd>
            </button>
          </MenuItem>
          <div className='my-1 h-px bg-grey-200 dark:bg-grey-400' />
          {/* <MenuItem>
            <button className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-grey-100 data-[focus]:dark:bg-grey-600'>
            <HiArchiveBox className='size-4 fill-grey-700 dark:fill-grey-500' />
            Archive
            <kbd className='ml-auto hidden font-sans text-xs text-grey-700 dark:text-grey-0 group-data-[focus]:inline'>
            ⌘A
            </kbd>
            </button>
            </MenuItem> */}
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
