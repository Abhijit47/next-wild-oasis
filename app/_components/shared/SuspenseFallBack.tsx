import { CgSpinner } from 'react-icons/cg';

export default function SuspenseFallBack() {
  return (
    <div className={'h-dvh grid place-items-center'}>
      <CgSpinner className={'animate-spin text-2xl text-blue-500'} />
    </div>
  );
}
