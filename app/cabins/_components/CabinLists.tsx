import { getCabins } from '@/app/_lib/services/cabins.services';
import CabinCard from './CabinCard';

type CabinListsProps = {
  filter: 'all' | 'small' | 'medium' | 'large';
};

export default async function CabinLists(props: CabinListsProps) {
  const { filter } = props;

  const cabins = await getCabins();

  if (!cabins.length) return null;

  //filtering data
  let displayedCabins: Cabin[] = [];

  if (filter === 'all') {
    displayedCabins = cabins;
  }

  if (filter === 'small') {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }

  if (filter === 'medium') {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  }

  if (filter === 'large') {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
