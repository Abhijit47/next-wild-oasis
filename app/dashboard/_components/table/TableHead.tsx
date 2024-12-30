import { classNames } from '@/app/_utils/helpers';

export default function TableHead(props: TableHeadProps) {
  return (
    <thead
      className={classNames(
        'uppercase tracking-wider border-b-2 dark:border-grey-600 bg-grey-0 dark:bg-grey-700'
      )}>
      {props.children}
    </thead>
  );
}
