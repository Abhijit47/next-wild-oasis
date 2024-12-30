import { CgSpinner } from 'react-icons/cg';

export default function DynamicComponentFallBack() {
  return (
    <div className={'w-full h-full grid place-items-center'}>
      <span className={'sr-only'}>Loading...</span>
      <span>
        <CgSpinner className={'animate-spin text-2xl text-blue-500'} />
      </span>
    </div>
  );
}
