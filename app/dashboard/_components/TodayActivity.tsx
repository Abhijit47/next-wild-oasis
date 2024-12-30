import { getStaysTodayActivity } from '@/app/_lib/services/bookings.services';
import Heading from './shared/Heading';

export default async function TodayActivity() {
  const activities = await getStaysTodayActivity();

  console.log({ activities: activities[0] });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <figure
      className={
        'aspect-video h-full w-full rounded-lg p-4 bg-grey-0 dark:bg-grey-700'
      }>
      <Heading as='h3'>Today </Heading>
    </figure>
  );
}
