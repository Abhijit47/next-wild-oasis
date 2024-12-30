'use client';

import { Tab, TabGroup, TabList } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// const categories = [
//   {
//     name: 'Recent',
//     posts: [
//       {
//         id: 1,
//         title: 'Does drinking coffee make you smarter?',
//         date: '5h ago',
//         commentCount: 5,
//         shareCount: 2,
//       },
//       {
//         id: 2,
//         title: "So you've bought coffee... now what?",
//         date: '2h ago',
//         commentCount: 3,
//         shareCount: 2,
//       },
//     ],
//   },
//   {
//     name: 'Popular',
//     posts: [
//       {
//         id: 1,
//         title: 'Is tech making coffee better or worse?',
//         date: 'Jan 7',
//         commentCount: 29,
//         shareCount: 16,
//       },
//       {
//         id: 2,
//         title: 'The most innovative things happening in coffee',
//         date: 'Mar 19',
//         commentCount: 24,
//         shareCount: 12,
//       },
//     ],
//   },
//   {
//     name: 'Trending',
//     posts: [
//       {
//         id: 1,
//         title: 'Ask Me Anything: 10 answers to your questions about coffee',
//         date: '2d ago',
//         commentCount: 9,
//         shareCount: 5,
//       },
//       {
//         id: 2,
//         title: "The worst advice we've ever heard about coffee",
//         date: '4d ago',
//         commentCount: 1,
//         shareCount: 2,
//       },
//     ],
//   },
// ];

const filters = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Small',
    value: 'small',
  },
  {
    name: 'Medium',
    value: 'medium',
  },
  {
    name: 'Large',
    value: 'large',
  },
];

export default function CabinFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);

    params.set('capacity', filter);
    console.log(`${pathname}?${params.toString()}`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className='max-w-md ring-1 rounded-full ring-accent-600 p-1'>
      <TabGroup>
        <TabList className='flex justify-center gap-4'>
          {filters.map(({ name }) => (
            <Tab
              key={name}
              className='rounded-full py-1 px-3 text-sm/6 font-semibold text-accent-400 focus:outline-none data-[selected]:bg-accent-400 data-[selected]:text-accent-50 data-[hover]:bg-accent-500 data-[hover]:text-accent-50 data-[selected]:data-[hover]:bg-accent-500 data-[focus]:outline-1 data-[focus]:outline-accent-400'
              onClick={() => handleFilter(name.toLowerCase())}>
              {name}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  );
}

export function FilterButton({
  children,
  filter,
  onFilter,
  activeFilter,
}: {
  children: React.ReactNode;
  filter: 'all' | 'small' | 'medium' | 'large';
  onFilter: (filter: 'all' | 'small' | 'medium' | 'large') => void;
  activeFilter: 'all' | 'small' | 'medium' | 'large';
}) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
      }`}
      onClick={() => onFilter(filter)}>
      {children}
    </button>
  );
}
