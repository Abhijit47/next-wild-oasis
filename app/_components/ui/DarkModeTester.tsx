'use client';

import useThemePreference from '@/app/_hooks/useThemePreference';

export default function DarkModeTester() {
  const { activeTheme, toggleThemeChange } = useThemePreference();
  return (
    <div>
      <div>
        <p className={'text-brand-600 dark:text-red-600'}>Dark mode text</p>
      </div>

      <div>
        <h1 className='text-center font-bold text-slate-900 dark:text-cyan-500 text-5xl leading-tight mb-3'>
          Tailwind CSS: Dark Mode Tutorial
        </h1>
        <p className='text-lg font-medium text-slate-700 dark:text-cyan-700 text-center mb-5'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
          corporis officia illum saepe voluptates, assumenda molestiae
          exercitationem quisquam illo omnis? Fuga, voluptates? Eum dolor ipsam
          expedita perspiciatis doloremque, ad illo!
        </p>

        <div className='flex items-center'>
          <button
            onClick={() => toggleThemeChange('light')}
            className={`flex justify-center items-center m-auto text-lg w-fit transition-color duration-200 ease-in-out py-3 px-10 rounded-lg font-semibold ${
              activeTheme === 'light'
                ? 'bg-cyan-800 text-gray-50 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300 hover:bg-slate-600'
                : 'bg-slate-500 dark:bg-slate-600 hover:bg-cyan-800 text-gray-100 dark:text-gray-400'
            }`}>
            Light Theme
          </button>
          <button
            onClick={() => toggleThemeChange('dark')}
            className={`flex justify-center items-center m-auto text-lg w-fit transition-color duration-200 ease-in-out py-3 px-10 rounded-lg font-semibold ${
              activeTheme === 'dark'
                ? 'bg-cyan-800 text-gray-50 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300 hover:bg-slate-600'
                : 'bg-slate-500 dark:bg-slate-600 hover:bg-cyan-800 text-gray-50 dark:text-gray-400'
            }`}>
            Dark Theme
          </button>
          <button
            onClick={() => toggleThemeChange('system')}
            className={`flex justify-center items-center m-auto text-lg w-fit transition-color duration-200 ease-in-out py-3 px-10 rounded-lg font-semibold ${
              activeTheme === 'system'
                ? 'bg-cyan-800 text-gray-50 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300 hover:bg-slate-600'
                : 'bg-slate-500 dark:bg-slate-600 hover:bg-cyan-800 text-gray-50 dark:text-gray-400'
            }`}>
            Use System Theme
          </button>
        </div>
      </div>
    </div>
  );
}
