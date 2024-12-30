import { getBooking } from '@/app/_lib/services/bookings.services';
import { getSettings } from '@/app/_lib/services/settings.services';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi2';
import DashboardMainContent from '../../_components/DashboardMainContent';
import DashboardMainContentInner from '../../_components/DashboardMainContentInner';
import DashboardMainContentShell from '../../_components/DashboardMainContentShell';
import DashboardPageTitle from '../../_components/DashboardPageTitle';
import Tag from '../../_components/ui/Tag';
import CheckInDataBox from './_components/CheckInDataBox';

export default async function CheckInPage(props: CheckInPageProps) {
  const { params } = props;
  const id = (await params).id;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (!id) {
    notFound();
  }

  const booking = await getBooking(parseInt(id));
  const settings = await getSettings();

  const optionalBreakfastPrice =
    settings.breakfastPrice * booking.numNights * booking.numGuests;

  return (
    <DashboardMainContent>
      <DashboardMainContentInner>
        <div className={'flex items-center justify-between'}>
          <div className={'flex items-center gap-8'}>
            <DashboardPageTitle resourceName='Checkin' resourceId={id} />{' '}
            <Tag type={statusToTagName[booking.status]}>
              {booking.status.replace('-', ' ')}
            </Tag>
          </div>
          <Link
            href='/dashboard/bookings'
            className={'inline-flex items-center gap-2 text-brand-600'}>
            <span>
              <HiArrowLeft className={'size-4'} />
            </span>
            <span>Back</span>
          </Link>
        </div>
        <DashboardMainContentShell>
          <CheckInDataBox
            booking={booking}
            optionalBreakfastPrice={optionalBreakfastPrice}
          />
        </DashboardMainContentShell>
      </DashboardMainContentInner>
    </DashboardMainContent>
  );
}
