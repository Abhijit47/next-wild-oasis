'use client';

import { Button } from '@headlessui/react';
import { useFormStatus } from 'react-dom';

export default function UploaderButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={status.pending}
      className='inline-flex w-full justify-center items-center gap-2 rounded-md bg-brand-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-brand-600 data-[open]:bg-brand-700 data-[focus]:outline-1 data-[focus]:outline-white capitalize disabled:bg-brand-200 disabled:cursor-not-allowed'>
      {children}
    </Button>
  );
}
