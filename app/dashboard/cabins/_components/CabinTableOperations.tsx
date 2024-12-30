import Filter from '@/app/_components/Filter';
import SortBy from '@/app/_components/SortBy';
import DashboardPageTitle from '../../_components/DashboardPageTitle';

export default function CabinTableOperations() {
  return (
    <div className='flex justify-between items-center gap-6'>
      <DashboardPageTitle />
      <Filter
        filterField={'discount'}
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
          {
            value: 'regularPrice-desc',
            label: 'Sort by price (high first)',
          },
          {
            value: 'maxCapacity-asc',
            label: 'Sort by capacity (low first)',
          },
          {
            value: 'maxCapacity-desc',
            label: 'Sort by capacity (high first)',
          },
        ]}
      />
    </div>
  );
}
