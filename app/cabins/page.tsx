import { Metadata } from 'next';
import { Suspense } from 'react';
import CabinFilter from './_components/CabinFilter';
import CabinLists from './_components/CabinLists';
import ReservationReminder from './_components/ReservationReminder';

export const metadata: Metadata = {
  title: 'Cabins',
};

type CabinsPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    capacity: 'all' | 'small' | 'medium' | 'large';
  }>;
};

export default async function CabinsPage(props: CabinsPageProps) {
  const filter = (await props.searchParams).capacity ?? 'all';

  return (
    <main className={'max-w-7xl mx-auto w-full'}>
      <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
        Our Luxury Cabins
      </h1>
      <p className='text-primary-200 text-lg mb-10'>
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className={'flex justify-end mb-8'}>
        <CabinFilter />
      </div>

      <Suspense fallback={<div>Loading...</div>} key={filter}>
        <CabinLists filter={filter} />
        <ReservationReminder />
      </Suspense>
    </main>
  );
}
