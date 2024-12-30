import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function DashboardSearchForm() {
  return (
    <div className='flex-1 flex'>
      <form className='w-full flex md:ml-0' action='#' method='GET'>
        <label htmlFor='search-field' className='sr-only'>
          Search
        </label>
        <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
          <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
            <HiMagnifyingGlass className='h-5 w-5' aria-hidden='true' />
          </div>
          <input
            id='search-field'
            className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-grey-800 dark:text-grey-300 placeholder-grey-500 focus:outline-none focus:placeholder-gray-400 focus:dark:placeholder-grey-100 focus:ring-0 focus:border-transparent sm:text-sm bg-grey-0 dark:bg-gray-800'
            placeholder='Search'
            type='search'
            name='search'
          />
        </div>
      </form>
    </div>
  );
}
