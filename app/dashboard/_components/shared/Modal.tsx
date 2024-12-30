'use client';

import { ModalContext } from '@/app/_contexts/ModalContext';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { use } from 'react';
import { HiXMark } from 'react-icons/hi2';
import Heading from './Heading';

type ModalProps = {
  title?: string;
  render: React.ReactNode;
};

export default function Modal(props: ModalProps) {
  const { title, render } = props;
  const { isModalOpen, onToggle } = use(ModalContext);

  return (
    <Dialog
      open={isModalOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={onToggle}
      __demoMode={false}>
      <div className='fixed inset-0 z-10 bg-black/80 w-screen overflow-y-auto duration-300 ease-out data-[closed]:opacity-0'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-3xl rounded-xl bg-grey-0 dark:bg-grey-800 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'>
            <DialogTitle as='div' className='flex items-center justify-between'>
              {title ? (
                <Heading
                  as='h3'
                  className={'text-base/7 font-medium text-white'}>
                  {title}
                </Heading>
              ) : (
                <span className={'block'}>&nbsp;</span>
              )}
              <Button
                onClick={onToggle}
                className='inline-flex items-center gap-2 rounded-md bg-brand-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-brand-600 data-[open]:bg-brand-700 data-[focus]:outline-1 data-[focus]:outline-white capitalize disabled:bg-brand-200 disabled:cursor-not-allowed'>
                <span className={'sr-only'}>close the modal</span>
                <span>
                  <HiXMark className={'size-4 md:size-4'} />
                </span>
              </Button>
            </DialogTitle>
            {render}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
