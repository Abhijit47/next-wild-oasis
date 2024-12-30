'use client'; // Error boundaries must be Client Components

import { Button } from '@headlessui/react';
import { useEffect } from 'react';
import Heading from './_components/shared/Heading';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className={'grid h-dvh place-items-center'}>
      <Heading as='h2'>Something went wrong!</Heading>
      <Button
        type='button'
        className='inline-flex items-center gap-2 rounded-md bg-brand-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-brand-600 data-[open]:bg-brand-700 data-[focus]:outline-1 data-[focus]:outline-white capitalize disabled:bg-brand-200 disabled:cursor-not-allowed'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </Button>
    </main>
  );
}
