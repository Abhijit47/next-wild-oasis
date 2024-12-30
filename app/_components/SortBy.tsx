'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { HiChevronDown } from 'react-icons/hi2';

type SortByProps = {
  options: { value: string; label: string }[];
};

export default function SortBy(props: SortByProps) {
  const { options } = props;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sortBy = searchParams.get('sortBy') || '';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className='w-36'>
      <Menu __demoMode={false}>
        <MenuButton className='w-fit inline-flex items-center gap-2 rounded-md bg-grey-400 dark:bg-grey-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'>
          Sort by
          <HiChevronDown className='size-4 fill-white/60' />
        </MenuButton>

        <MenuItems
          transition
          anchor='bottom end'
          className='w-fit origin-top-right rounded-xl border border-white/5 bg-grey-400 dark:bg-grey-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[selected]:bg-grey-800 data-[selected]:dark:bg-grey-600 data-[hover]:bg-grey-800 data-[hover]:dark:bg-grey-700 data-[selected]:data-[hover]:bg-grey-700 data-[selected]:data-[hover]:dark:bg-grey-600 data-[focus]:outline-1 data-[focus]:outline-grey-0 data-[focus]:dark:outline-grey-800'>
          {options.map((option) => (
            <MenuItem key={option.value}>
              <button
                disabled={sortBy === option.value}
                className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 data-[focus]:dark:bg-black/10 data-[focus]:text-white data-[focus]:dark:text-white data-[disabled]:bg-grey-400 data-[disabled]:dark:bg-grey-700 data-[disabled]:text-white data-[disabled]:dark:text-white data-[disabled]:cursor-not-allowed'
                onClick={() => {
                  router.push(
                    `${pathname}?${createQueryString('sortBy', option.value)}`
                  );
                }}>
                {option.label}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
