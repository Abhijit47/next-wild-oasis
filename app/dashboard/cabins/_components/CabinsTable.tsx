import { getCabins } from '@/app/_lib/services/cabins.services';
import { formatCurrency } from '@/app/_utils/helpers';
import Image from 'next/image';
import Table from '../../_components/table/Table';
import TableBody from '../../_components/table/TableBody';
import TableData from '../../_components/table/TableData';
import TableHead from '../../_components/table/TableHead';
import TableHeader from '../../_components/table/TableHeader';
import TableRow from '../../_components/table/TableRow';
import TableWrapper from '../../_components/table/TableWrapper';
import CabinTableMenuButton from './CabinTableMenuButton';

export default async function CabinsTable(props: CabinsTableProps) {
  const { searchParams } = props;
  const cabins = await getCabins();

  if (!cabins) {
    return <div>Cabins could not be loaded</div>;
  }

  // 1) FILTER
  // default value is all short-circuiting
  const filterValue = (await searchParams).discount || 'all';

  let filteredCabins: Cabin[] = [];
  if (filterValue === 'all') filteredCabins = cabins;

  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  const sortBy = (await searchParams).sortBy || 'startDate-asc';

  const [field, direction] = sortBy.split('-') as [keyof Cabin, 'asc' | 'desc'];

  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) => (Number(a[field]) - Number(b[field])) * modifier
  );
  // console.log(sortedCabins);

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0'}>
              <span className={'sr-only'}>Cabin Image</span>
            </TableHeader>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0'}>
              Cabin
            </TableHeader>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0'}>
              Capacity
            </TableHeader>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0'}>
              Price
            </TableHeader>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0'}>
              Discount
            </TableHeader>
            <TableHeader
              scope='col'
              className={'text-grey-700 dark:text-grey-0'}>
              <span className={'sr-only'}>Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedCabins.map((cabin, idx) => (
            <TableRow key={idx + 1}>
              <TableData className={'text-grey-700 dark:text-grey-0'}>
                <div className={'size-20 mx-auto'}>
                  <Image
                    src={cabin.image}
                    alt={cabin.name}
                    width={100}
                    height={100}
                    className={'w-full h-full rounded-lg'}
                  />
                </div>
              </TableData>
              <TableHeader
                scope='row'
                className={'text-grey-700 dark:text-grey-0'}>
                {cabin.name}
              </TableHeader>
              <TableData className={'text-grey-700 dark:text-grey-0'}>
                Fit up to {cabin.maxCapacity} guests
              </TableData>
              <TableData className={'text-grey-700 dark:text-grey-0'}>
                <p className={'font-primary font-semibold text-sm'}>
                  {formatCurrency(cabin.regularPrice)}
                </p>
              </TableData>
              <TableData className={'text-grey-700 dark:text-grey-0'}>
                <p className={'font-primary font-semibold text-sm'}>
                  {cabin.discount ? (
                    <span>{formatCurrency(cabin.discount)}</span>
                  ) : (
                    <span>&mdash;</span>
                  )}
                </p>
              </TableData>
              <TableData className={'text-grey-700 dark:text-grey-0'}>
                <CabinTableMenuButton cabin={cabin} />
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
