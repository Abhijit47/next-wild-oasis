import { PAGE_SIZE } from '@/app/_constants';
import { classNames } from '@/app/_utils/helpers';
import { Button } from '@headlessui/react';
import Link from 'next/link';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2';

export default async function TablePagination(props: TablePaginationProps) {
  const { count, searchParams } = props;

  const currentPage = !(await searchParams).page
    ? 1
    : Number((await searchParams).page);

  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 0;

  // last page
  const lastPage = pageCount === currentPage ? currentPage : pageCount;

  return (
    <nav
      className='flex items-center justify-between p-4 mt-5 text-sm'
      aria-label='Page navigation example'>
      <p className={'text-grey-700 dark:text-grey-0'}>
        showing <strong>{(currentPage - 1) * PAGE_SIZE + 1}</strong> to{' '}
        <strong>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </strong>{' '}
        of <strong>{count}</strong> results
      </p>

      <ul className='flex gap-4 list-style-none'>
        <li>
          {currentPage > 1 ? (
            <Link
              className='relative inline-flex items-center gap-2 w-full rounded px-3 py-1.5 text-sm text-grey-0 dark:text-grey-0 transition-all duration-300 bg-brand-600 hover:bg-brand-500 dark:bg-brand-600 dark:hover:bg-brand-700 dark:hover:text-grey-0'
              href={{
                pathname: '/dashboard/bookings',
                query: { page: currentPage === 1 ? 1 : currentPage - 1 },
              }}>
              <span>
                <HiChevronDoubleLeft className='inline-block w-4 h-4' />
              </span>
              <span>Prev</span>
            </Link>
          ) : (
            <Button className='relative inline-flex items-center gap-2 w-full rounded px-3 py-1.5 text-sm text-grey-0 dark:text-grey-0 transition-all duration-300 bg-brand-200 hover:bg-brand-200 dark:bg-brand-200 dark:hover:bg-brand-200 dark:hover:text-grey-0 cursor-not-allowed'>
              <span>
                <HiChevronDoubleLeft className='inline-block w-4 h-4' />
              </span>
              <span>Prev</span>
            </Button>
          )}
        </li>

        {/* Pagination bullets */}
        {Array.from({ length: pageCount }, (_, i) => (
          <li key={i}>
            <Link
              className={classNames(
                'relative block rounded px-3 py-1.5 text-sm text-grey-600 transition-all duration-300 hover:bg-grey-100 dark:text-grey-0 dark:hover:bg-grey-500 dark:hover:text-grey-0',
                currentPage === i + 1
                  ? 'bg-brand-100 text-grey-700 dark:bg-brand-700 dark:text-grey-0'
                  : ''
              )}
              href={{
                pathname: '/dashboard/bookings',
                query: { page: i + 1 },
              }}>
              {i + 1}
              {/* {currentPage === i + 1 && (
                <span className='absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-1 [clip:rect(50,50,50,50)] bg-red-700'>
                  {currentPage}
                </span>
              )} */}
            </Link>
          </li>
        ))}

        <li>
          {currentPage === lastPage ? (
            <Button className='relative inline-flex items-center gap-2 w-full rounded px-3 py-1.5 text-sm text-grey-0 dark:text-grey-0 transition-all duration-300 bg-brand-200 hover:bg-brand-200 dark:bg-brand-200 dark:hover:bg-brand-200 dark:hover:text-grey-0 cursor-not-allowed'>
              <span>Next</span>
              <span>
                <HiChevronDoubleRight className='inline-block w-4 h-4' />
              </span>
            </Button>
          ) : (
            <Link
              className='relative inline-flex items-center gap-2 w-full rounded px-3 py-1.5 text-sm text-grey-0 dark:text-grey-0 transition-all duration-300 bg-brand-600 hover:bg-brand-500 dark:bg-brand-600 dark:hover:bg-brand-700 dark:hover:text-grey-0'
              href={{
                pathname: '/dashboard/bookings',
                query: {
                  page: currentPage === lastPage ? lastPage : currentPage + 1,
                },
              }}>
              <span>Next</span>
              <span>
                <HiChevronDoubleRight className='inline-block w-4 h-4' />
              </span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
