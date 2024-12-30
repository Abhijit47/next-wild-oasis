'use client';

import { classNames } from '@/app/_utils/helpers';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  // HiArchiveBoxXMark,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from 'react-icons/hi2';

type DropDownMenuProps = {
  buttonName: string;
  icon: React.ReactElement<'svg'>;
  srOnly?: boolean;
};

const options = [
  {
    name: 'see details',
    href: '#',
    icon: HiPencil,
  },
  {
    name: 'check out',
    href: '#',
    icon: HiSquare2Stack,
  },
  {
    name: 'delete booking',
    href: '#',
    icon: HiTrash,
  },
];

export default function DropDownMenu(props: DropDownMenuProps) {
  return (
    <div className='w-fit text-right'>
      <Menu __demoMode={false}>
        <MenuButton className='inline-flex items-center gap-2 rounded-md bg-grey-0 dark:bg-grey-800 py-1.5 px-3 text-sm/6 font-semibold text-grey-700 dark:text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:dark:bg-grey-700 data-[open]:dark:bg-grey-700 data-[focus]:outline-1 data-[focus]:outline-white'>
          <span className={classNames(props.srOnly ? 'sr-only' : '')}>
            {props.buttonName}
          </span>
          {/* <HiChevronDown className='size-4 fill-white/60' /> */}
          {props.icon}
        </MenuButton>

        <MenuItems
          transition
          anchor='bottom end'
          className='w-52 origin-top-right rounded-xl ring-1 bg-grey-0 dark:bg-grey-800 p-1 text-sm/6 dark:text-grey-0 text-grey-700 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'>
          {options.map((option) => (
            <MenuItem key={option.name}>
              <a
                href={option.href}
                className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-grey-500 data-[focus]:dark:bg-grey-200'>
                <option.icon className='size-4 fill-white/30' />
                {option.name}
              </a>
            </MenuItem>
          ))}

          {/* <MenuItem>
            <button className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-grey-500 data-[focus]:dark:bg-grey-200'>
              <HiPencil className='size-4 fill-white/30' />
              Edit
              <kbd className='ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline'>
                ⌘E
              </kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'>
              <HiSquare2Stack className='size-4 fill-white/30' />
              Duplicate
              <kbd className='ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline'>
                ⌘D
              </kbd>
            </button>
          </MenuItem>
          <div className='my-1 h-px bg-white/5' />
          <MenuItem>
            <button className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'>
              <HiArchiveBoxXMark className='size-4 fill-white/30' />
              Archive
              <kbd className='ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline'>
                ⌘A
              </kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'>
              <HiTrash className='size-4 fill-white/30' />
              Delete
              <kbd className='ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline'>
                ⌘D
              </kbd>
            </button>
          </MenuItem> */}
        </MenuItems>
      </Menu>
    </div>
  );
}
