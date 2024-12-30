import { getBookings } from '@/app/_lib/services/bookings.services';
import { formatCurrency, formatDistanceFromNow } from '@/app/_utils/helpers';
import { format, isToday } from 'date-fns';
import Table from '../../_components/table/Table';
import TableBody from '../../_components/table/TableBody';
import TableData from '../../_components/table/TableData';
import TableHead from '../../_components/table/TableHead';
import TableHeader from '../../_components/table/TableHeader';
import TablePagination from '../../_components/table/TablePagination';
import TableRow from '../../_components/table/TableRow';
import TableWrapper from '../../_components/table/TableWrapper';
import Tag from '../../_components/ui/Tag';
import BookingTableMenuButton from './BookingTableMenuButton';

export default async function BookingTable(props: BookingTableProps) {
  const { searchParams } = props;

  // FILTER
  const filterValue = (await searchParams).status;
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  // { field: 'totalPrice', value: 5000, method: 'gte' };

  // SORT
  const sortByRaw = (await searchParams).sortBy || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // PAGINATION
  const page = !(await searchParams).page
    ? 1
    : Number((await searchParams).page);

  // console.log('sortBy', sortBy);
  // console.log('filter', filter);
  // console.log('page', page);

  const { data, count } = await getBookings({ filter, sortBy, page });

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0 text-center'}>
              Cabin
            </TableHeader>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0 text-center'}>
              Guest
            </TableHeader>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0 text-center'}>
              Dates
            </TableHeader>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0 text-center'}>
              Status
            </TableHeader>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0 text-center'}>
              Amount
            </TableHeader>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0'}>
              <span className={'sr-only'}>Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((booking) => (
            <TableRow key={booking.id}>
              <TableHeader
                scope='row'
                className={'text-grey-700 dark:text-grey-0'}>
                {booking.cabins ? booking.cabins?.name : 'No Cabin'}
              </TableHeader>
              <TableData className={'text-grey-700 dark:text-grey-0'}>
                <p className={'flex flex-col gap-1'}>
                  <span className={'inline-block font-semibold'}>
                    {booking.guests ? booking.guests?.fullName : 'No Guest'}
                  </span>
                  <span className={'inline-block'}>
                    {booking.guests ? booking.guests?.email : 'No Email'}
                  </span>
                </p>
              </TableData>
              <TableData
                className={'text-grey-700 dark:text-grey-0 text-center'}>
                <p className={'flex flex-col gap-1'}>
                  <span className={'inline-block font-semibold'}>
                    {isToday(new Date(booking.startDate))
                      ? 'Today'
                      : formatDistanceFromNow(booking.startDate)}{' '}
                    &rarr; {booking.numNights} night stay
                  </span>
                  <span className={'inline-block'}>
                    {format(new Date(booking.startDate), 'MMM dd yyyy')} &mdash;{' '}
                    {format(new Date(booking.endDate), 'MMM dd yyyy')}
                  </span>
                </p>
              </TableData>
              <TableData
                className={'text-grey-700 dark:text-grey-0 text-center'}>
                <Tag type={statusToTagName[booking.status]}>
                  {booking.status.replace('-', ' ')}
                </Tag>
              </TableData>
              <TableData
                className={'text-grey-700 dark:text-grey-0 text-center'}>
                <p className={'font-primary font-semibold text-sm'}>
                  {formatCurrency(booking.totalPrice)}
                </p>
              </TableData>
              <TableData className={'text-center'}>
                <BookingTableMenuButton booking={booking} />
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination count={count} searchParams={props.searchParams} />
    </TableWrapper>
  );
}
