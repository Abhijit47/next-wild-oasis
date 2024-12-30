'use client';

import { HiMoon, HiSun } from 'react-icons/hi2';
import { useDarkMode } from '../_contexts/DarkModeContext';

export default function ButtonForTest() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className='dark flex justify-center items-center m-auto text-lg w-fit bg-cyan-700 hover:bg-cyan-800 transition-color duration-200 ease-in-out py-3 px-10 rounded-lg text-gray-50 font-semibold dark:bg-slate-700 dark:hover:bg-red-800 dark:text-slate-50'>
      {isDarkMode ? <HiSun /> : <HiMoon />}
    </button>
  );
}
