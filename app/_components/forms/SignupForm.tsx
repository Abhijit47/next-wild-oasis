'use client';

import { classNames } from '@/app/_utils/helpers';
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi2';

export default function SignupForm() {
  return (
    <form action=''>
      <div className='w-full max-w-lg px-4'>
        <Fieldset className='space-y-6 rounded-xl bg-grey-500 p-6 sm:p-10'>
          <Legend className='text-base/7 font-semibold text-white'>
            Shipping details
          </Legend>
          <Field>
            <Label className='text-sm/6 font-medium text-white'>
              Street address
            </Label>
            <Input
              className={classNames(
                'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
            />
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-white'>Country</Label>
            <Description className='text-sm/6 text-white/50'>
              We currently only ship to North America.
            </Description>
            <div className='relative'>
              <Select
                className={classNames(
                  'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  // Make the text of each option black on Windows
                  '*:text-black'
                )}>
                <option>Canada</option>
                <option>Mexico</option>
                <option>United States</option>
              </Select>
              <HiChevronDown
                className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60'
                aria-hidden='true'
              />
            </div>
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-white'>
              Delivery notes
            </Label>
            <Description className='text-sm/6 text-white/50'>
              If you have a tiger, we&apos;d like to know about it.
            </Description>
            <Textarea
              className={classNames(
                'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
              rows={3}
            />
          </Field>
          <Button className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'>
            Save changes
          </Button>
        </Fieldset>
      </div>
    </form>
  );
}
