'use client';

import { classNames } from '@/app/_utils/helpers';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
// import {
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
//   Transition,
// } from '@headlessui/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import {
  // Fragment,
  useEffect,
  useState,
} from 'react';
import { HiChevronDoubleDown, HiDesktopComputer } from 'react-icons/hi';
import { HiCheck, HiMoon, HiSun } from 'react-icons/hi2';

const themes = [
  { name: 'Light', value: 'light', icon: HiSun },
  { name: 'Dark', value: 'dark', icon: HiMoon },
  { name: 'System', value: 'system', icon: HiDesktopComputer },
];

export default function ThemeMenu() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src='data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=='
        width={36}
        height={36}
        sizes='36x36'
        alt='Loading Light/Dark Toggle'
        priority={false}
        title='Loading Light/Dark Toggle'
      />
    );
  }

  // return (
  //   <Menu as='div' className='ml-3 relative'>
  //     <div>
  //       <MenuButton className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
  //         <span className='sr-only'>Open user menu</span>
  //         <HiSwatch className='size-6 rounded-full' />
  //       </MenuButton>
  //     </div>
  //     <Transition
  //       as={Fragment}
  //       enter='transition ease-out duration-100'
  //       enterFrom='transform opacity-0 scale-95'
  //       enterTo='transform opacity-100 scale-100'
  //       leave='transition ease-in duration-75'
  //       leaveFrom='transform opacity-100 scale-100'
  //       leaveTo='transform opacity-0 scale-95'>
  //       <MenuItems className='origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
  //         {themes.map((item) => (
  //           <MenuItem key={item.name}>
  //             {({ focus }) => (
  //               <button
  //                 className={
  //                   'inline-flex w-full flex-col items-start justify-between'
  //                 }
  //                 onClick={() => setTheme(item.value)}>
  //                 <span
  //                   className={classNames(
  //                     focus ? 'bg-gray-100' : '',
  //                     theme === item.value ? 'font-semibold' : '',
  //                     'px-4 py-2 text-sm text-gray-700 flex w-full items-center gap-2'
  //                   )}>
  //                   <span>{item.name}</span>
  //                   <span>{<item.icon className='w-5 h-5' />}</span>
  //                 </span>
  //               </button>
  //             )}
  //           </MenuItem>
  //         ))}
  //       </MenuItems>
  //     </Transition>
  //   </Menu>
  // );

  function handleThemeChange(theme: (typeof themes)[0]) {
    setTheme(theme.value);
    setSelectedTheme(theme);
  }

  return (
    <Listbox
      as={'div'}
      value={selectedTheme}
      className='mx-auto w-36 bg-gray-100 dark:bg-grey-900 rounded-lg'
      onChange={(theme) => handleThemeChange(theme)}>
      <ListboxButton
        className={classNames(
          'relative block w-full rounded-lg bg-gray-100 dark:bg-grey-900 py-1.5 pr-8 pl-3 text-left text-sm/6 text-grey-800 dark:text-grey-0',
          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 data-[focus]:dark:outline-slate-100 z-[1000] flex items-center gap-1'
        )}>
        <span>{selectedTheme.name}</span>
        <span>{<selectedTheme.icon />}</span>
        <HiChevronDoubleDown
          className='group pointer-events-none absolute top-2.5 right-2.5 size-4 dark:fill-grey-0 fill-grey-800'
          aria-hidden='true'
          aria-label={theme}
        />
      </ListboxButton>
      <ListboxOptions
        anchor='bottom'
        transition
        className={classNames(
          'w-[var(--button-width)] rounded-xl border border-white/5 bg-gray-100 dark:bg-grey-900 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-10'
        )}>
        {themes.map((theme) => (
          <ListboxOption
            key={theme.name}
            value={theme}
            className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-grey-200 data-[focus]:dark:bg-grey-800 hover:cursor-pointer'>
            <HiCheck className='invisible size-4 dark:fill-grey-0 fill-grey-800 group-data-[selected]:visible' />
            <div className='text-sm/6 text-grey-800 dark:text-grey-0 flex items-center gap-2 justify-center'>
              <span>{theme.name}</span>
              <span>{<theme.icon className='w-4 h-4' />}</span>
            </div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
