import { HiSparkles } from 'react-icons/hi2';

export default function Loading() {
  return (
    <div className={'h-dvh flex items-center justify-center'}>
      <span className={'sr-only'}>Loading...</span>
      <span className={''}>
        <HiSparkles className='size-4 md:size-6 lg:size-8 animate-pulse' />
      </span>
    </div>
  );
}
