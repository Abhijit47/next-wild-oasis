import { getBookedDatesByCabinId } from '@/app/_lib/services/bookings.services';
import { getSettings } from '@/app/_lib/services/settings.services';

import DateSelector from './DateSelector';
import LoginMessage from './LoginMessage';
import ReservationForm from './ReservationForm';

export default async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  // const session = await auth();
  const session: {
    user: { name: string; email: string; image: string };
  } = await new Promise((resolve) => {
    resolve({
      user: {
        name: 'Someone',
        email: 'someone@example.com',
        image: 'https://placehold.co/400x400?text=avatar',
      },
    });
  });

  return (
    <div
      className={
        'grid grid-cols-1 lg:grid-cols-2 border border-primary-800 gap-4'
      }>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
