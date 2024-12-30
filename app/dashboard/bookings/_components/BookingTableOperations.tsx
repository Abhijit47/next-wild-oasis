import Filter from '@/app/_components/Filter';
import SortBy from '@/app/_components/SortBy';
import DashboardPageTitle from '../../_components/DashboardPageTitle';

export default function BookingTableOperations() {
  return (
    <div className='flex justify-between items-center gap-6'>
      <DashboardPageTitle />
      <Filter
        filterField='status'
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />
      <SortBy
        options={[
          { value: 'startDate-desc', label: 'Sort by date (recent first)' },
          { value: 'startDate-asc', label: 'Sort by date (earlier first)' },
          {
            value: 'totalPrice-desc',
            label: 'Sort by amount (high first)',
          },
          { value: 'totalPrice-asc', label: 'Sort by amount (low first)' },
        ]}
      />
    </div>
  );
}
