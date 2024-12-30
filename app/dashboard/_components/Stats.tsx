import {
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineCurrencyRupee,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
import StatCard from './StatCard';

export default function Stats(props: StatsProps) {
  const { bookings, confirmedStays, numDays, cabinCount } = props;

  // 1. Calculate the number of bookings
  const numBookings = bookings.length;

  // 2. Calculate the total sales
  const totalSales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  // 3.Calculate total check ins
  const totalCheckIns = confirmedStays.length;

  //4. Calculate occupency rate
  // num checked in nights / all available nights (num of days * num cabins)
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}>
      <StatCard
        icon={<HiOutlineBriefcase className='size-8 stroke-blue-700' />}
        title={'Bookings'}
        value={numBookings.toString()}
        color={'bg-blue-100'}
      />
      <StatCard
        icon={<HiOutlineCurrencyRupee className='size-8 stroke-green-700' />}
        title={'Sales'}
        value={totalSales.toString()}
        color={'bg-green-100'}
      />
      <StatCard
        icon={<HiOutlineHomeModern className='size-8 stroke-indigo-700' />}
        title={'Check Ins'}
        value={totalCheckIns.toString()}
        color={'bg-indigo-100'}
      />
      <StatCard
        icon={<HiOutlineChartBar className='size-8 stroke-yellow-700' />}
        title={'Occupency Rate'}
        value={`${Math.round(occupation * 100)}% (${Math.round(
          occupation * cabinCount
        )} cabins)`}
        color={'bg-yellow-100'}
      />
    </div>
  );
}
