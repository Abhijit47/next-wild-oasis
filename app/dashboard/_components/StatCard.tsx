import Heading from './shared/Heading';

export default function StatCard(props: StatCardProps) {
  const { icon, title, value, color } = props;

  return (
    <figure
      className={
        'rounded-lg bg-grey-0 dark:bg-grey-700 shadow-md p-4 flex items-center gap-4'
      }>
      <span className={`p-4 rounded-full ${color} block`}>{icon}</span>
      <div>
        <Heading as='h2' className={'text-xl font-bold'}>
          {title}
        </Heading>
        <p className={`text-grey-700 dark:text-grey-0`}>{value}</p>
      </div>
    </figure>
  );
}
