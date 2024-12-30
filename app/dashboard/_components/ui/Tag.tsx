import { classNames } from '@/app/_utils/helpers';

export default function Tag({
  children,
  type,
}: {
  children: React.ReactNode;
  type: 'blue' | 'green' | 'silver' | ({} & string);
}) {
  return (
    <span
      className={classNames(
        'w-fit uppercase rounded-full text-xs px-4 py-1 font-semibold',
        type === 'blue' ? 'bg-blue-100 text-blue-700' : '',
        type === 'green' ? 'bg-green-100 text-green-700' : '',
        type === 'silver' ? 'bg-silver-100 text-silver-700' : ''
      )}>
      {children}
    </span>
  );
}
