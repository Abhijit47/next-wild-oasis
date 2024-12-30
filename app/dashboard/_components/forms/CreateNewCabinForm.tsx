import { createCabinInitialState } from '@/app/_constants';
import { createCabin } from '@/app/_lib/services/cabins.services';
import { classNames } from '@/app/_utils/helpers';
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Textarea,
  useClose,
} from '@headlessui/react';
import { useActionState, useTransition } from 'react';
import { toast } from 'sonner';

export default function CreateNewCabinForm() {
  const [state, action, isPending] = useActionState(
    createCabin,
    createCabinInitialState
  );
  const [isTransition, startTransition] = useTransition();
  const close = useClose();

  function createNewCabinAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      action(formData);

      if (state.success) {
        toast.success(state.message);
        close();
        return;
      }

      if (!state.success) {
        toast.error("Couldn't create user");
        close();
        return;
      }
    });
  }

  return (
    <form onSubmit={createNewCabinAction}>
      <div className='w-full'>
        <Fieldset className='space-y-6 rounded-xl dark:bg-grey-800'>
          <Legend
            className={classNames(
              state.message
                ? 'text-red-500 dark:text-red-500'
                : 'text-grey-700 dark:text-grey-0',
              'text-base/7 font-semibold'
            )}>
            {state.message ? state.message : 'Create a New Cabin'}
          </Legend>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              Cabin name
            </Label>
            <Input
              className={classNames(
                state.errors?.name ? 'ring-red-500 dark:ring-red-500' : '',
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='text'
              name='name'
              placeholder='2'
              required
              defaultValue={state.inputs ? state.inputs.name : ''}
            />
            <Description className='text-sm text-red-500 dark:text-red-500 mt-1'>
              {state.errors?.name}
            </Description>
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              Maximum capacity
            </Label>
            <Input
              className={classNames(
                state.errors?.maxCapacity
                  ? 'ring-red-500 dark:ring-red-500'
                  : '',
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='number'
              name='maxCapacity'
              placeholder='10'
              required
              defaultValue={state.inputs ? state.inputs.maxCapacity : 0}
            />
            <Description className='text-sm text-red-500 dark:text-red-500 mt-1'>
              {state.errors?.maxCapacity}
            </Description>
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              Regular price
            </Label>
            <Input
              className={classNames(
                state.errors?.regularPrice
                  ? 'ring-red-500 dark:ring-red-500'
                  : '',
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='number'
              name='regularPrice'
              placeholder='8'
              required
              defaultValue={state.inputs ? state.inputs.regularPrice : 0}
            />
            <Description className='text-sm text-red-500 dark:text-red-500 mt-1'>
              {state.errors?.regularPrice}
            </Description>
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              Discount
            </Label>
            <Input
              className={classNames(
                state.errors?.discount ? 'ring-red-500 dark:ring-red-500' : '',
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='number'
              name='discount'
              placeholder='15'
              required
              defaultValue={state.inputs ? state.inputs.discount : 0}
            />
            <Description className='text-sm text-red-500 dark:text-red-500 mt-1'>
              {state.errors?.discount}
            </Description>
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              Description for website
            </Label>
            <Description className='text-sm/6 text-grey-700 dark:text-grey-0'>
              Describe some details about the cabin
            </Description>
            <Textarea
              className={classNames(
                state.errors?.description
                  ? 'ring-red-500 dark:ring-red-500'
                  : '',
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500',
                'resize-none'
              )}
              rows={5}
              name='description'
              placeholder='A beautiful cabin in the woods'
              required
              defaultValue={state.inputs ? state.inputs.description : ''}
            />
            <Description className='text-sm text-red-500 dark:text-red-500 mt-1'>
              {state.errors?.description}
            </Description>
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-grey-700 dark:text-grey-0'>
              Cabin photo
            </Label>
            <Input
              className={classNames(
                state.errors?.image ? 'ring-red-500 dark:ring-red-500' : '',
                'mt-3 block w-full rounded-lg ring-1 ring-grey-700 dark:ring-0 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-grey-700 dark:text-grey-0',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                'placeholder:dark:text-grey-400 placeholder:text-grey-500'
              )}
              type='file'
              name='image'
              required
              accept='image/*'
            />
            <Description className='text-sm text-red-500 dark:text-red-500 mt-1'>
              {state.errors?.image}
            </Description>
          </Field>
          <div className={'flex w-full justify-end gap-4'}>
            <Button
              type='reset'
              disabled={isPending || isTransition}
              onClick={close}
              className='inline-flex items-center gap-2 rounded-md bg-brand-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-brand-600 data-[open]:bg-brand-700 data-[focus]:outline-1 data-[focus]:outline-white capitalize disabled:bg-brand-200 disabled:cursor-not-allowed'>
              cancel
            </Button>
            <Button
              type='submit'
              disabled={isPending || isTransition}
              className='inline-flex items-center gap-2 rounded-md bg-brand-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-brand-600 data-[open]:bg-brand-700 data-[focus]:outline-1 data-[focus]:outline-white capitalize disabled:bg-brand-200 disabled:cursor-not-allowed'>
              create cabin
            </Button>
          </div>
        </Fieldset>
      </div>
    </form>
  );
}
