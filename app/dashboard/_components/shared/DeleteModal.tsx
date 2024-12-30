'use client';

import { ModalContext } from '@/app/_contexts/ModalContext';
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { use } from 'react';
import { HiXMark } from 'react-icons/hi2';
import Heading from './Heading';

type DeleteModalProps = {
  resourceName: string;
  resourceId: number;
  onConfirm: (id: number) => Promise<Cabin | Booking>;
  // disabled: boolean;
};

export default function DeleteModal(props: DeleteModalProps) {
  const { resourceName, resourceId, onConfirm } = props;
  const { isDeleteModalOpen, onToggleDelete } = use(ModalContext);

  return (
    <Dialog
      open={isDeleteModalOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={onToggleDelete}
      __demoMode={false}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className='fixed inset-0 bg-black/80' />
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-lg rounded-xl dark:bg-grey-800 bg-grey-0 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>
            <DialogTitle as='div' className='flex items-center justify-between'>
              <Heading
                as='h3'
                className={
                  'text-base/7 font-medium text-grey-700 dark:text-grey-0'
                }>
                Delete {resourceName}
              </Heading>
              <Button
                className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                onClick={onToggleDelete}>
                <span className={'sr-only'}>close delete modal</span>
                <span>
                  <HiXMark className='w-4 h-4' />
                </span>
              </Button>
            </DialogTitle>
            <p className='mt-2 text-sm/6 text-grey-700 dark:text-grey-0'>
              Are you sure you want to delete this {resourceName} permanently?
              This action cannot be undone.
            </p>
            <div className='mt-4 flex justify-end gap-2'>
              <Button
                // disabled={disabled}
                className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                onClick={onToggleDelete}>
                Cancel
              </Button>
              <Button
                className='inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-red-700'
                onClick={() => {
                  onConfirm(resourceId);
                  onToggleDelete();
                }}>
                Delete
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
