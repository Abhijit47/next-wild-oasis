import { getCabin } from '@/app/_lib/services/cabins.services';
import { Suspense } from 'react';
import Cabin from '../_components/Cabin';
import Reservation from '../_components/Reservation';

type CabinPageProps = {
  params: Promise<{ cabinId: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

// PLACEHOLDER DATA
// const cabin = {
//   id: 89,
//   name: '001',
//   maxCapacity: 2,
//   regularPrice: 250,
//   discount: 0,
//   description:
//     'Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.',
//   image:
//     'https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg',
//   created_at: '',
// };

// Dynamic generate metadata
export async function generateMetadata(props: CabinPageProps) {
  const cabinId = (await props.params).cabinId;
  const { name } = await getCabin(Number(cabinId));
  return {
    title: `Cabin - ${name}`,
  };
}

// make this dynamic page to static page pre-rendered
// export async function generateStaticParams() {
//   const cabins = await getCabins();

//   const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

//   // console.log(ids);
//   return ids;
// }

export default async function CabinPage(props: CabinPageProps) {
  const cabinId = (await props.params).cabinId;

  const cabin = await getCabin(Number(cabinId));

  return (
    <main className={'max-w-7xl mx-auto'}>
      <Cabin cabin={cabin} />
      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<div>loading...</div>}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </main>
  );
}
