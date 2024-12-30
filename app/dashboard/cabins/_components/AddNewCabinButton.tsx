'use client';

import { ModalContext } from '@/app/_contexts/ModalContext';
import { Button } from '@headlessui/react';
import { use } from 'react';
import CreateNewCabinForm from '../../_components/forms/CreateNewCabinForm';
import Modal from '../../_components/shared/Modal';

export default function AddNewCabinButton() {
  const { onToggle } = use(ModalContext);

  return (
    <>
      <Button
        onClick={onToggle}
        className='inline-flex items-center gap-2 rounded-md bg-brand-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-brand-600 data-[open]:bg-brand-700 data-[focus]:outline-1 data-[focus]:outline-white capitalize disabled:bg-brand-200 disabled:cursor-not-allowed'>
        Add New Cabin
      </Button>
      <Modal render={<CreateNewCabinForm />} />
    </>
  );
}
