'use client';

import { Tab, TabGroup, TabList } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type FilterProps = {
  filterField: 'last' | 'status' | 'discount';
  options: {
    value: string;
    label: string;
  }[];
};

export default function Filter(props: FilterProps) {
  const { filterField, options } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentFilter = searchParams.get(filterField) || options[0].value;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className='flex h-full w-full justify-center'>
      <div className='w-full'>
        <TabGroup className={'w-full flex items-center justify-end'}>
          <TabList className='flex gap-4'>
            {options.map(({ label, value }) => (
              <Tab
                key={label}
                disabled={currentFilter === value}
                className='rounded-full py-1 px-3 text-sm/6 font-semibold bg-grey-400 dark:bg-grey-800 text-white focus:outline-none data-[selected]:bg-grey-800 data-[selected]:dark:bg-grey-600 data-[hover]:bg-grey-800 data-[hover]:dark:bg-grey-700 data-[selected]:data-[hover]:bg-grey-700 data-[selected]:data-[hover]:dark:bg-grey-600 data-[focus]:outline-1 data-[focus]:outline-grey-0 data-[focus]:dark:outline-grey-800 data-[disabled]:bg-grey-400 data-[disabled]:dark:bg-grey-800 data-[disabled]:text-grey-500 data-[disabled]:dark:text-grey-400 data-[disabled]:cursor-not-allowed'
                onClick={() => {
                  router.push(
                    `${pathname}?${createQueryString(filterField, value)}`
                  );
                }}>
                {label}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>
    </div>
  );
}
