import { classNames } from '@/app/_utils/helpers';

export default function TableRow(props: TableRowProps) {
  return (
    <tr
      className={classNames(
        props.className ? props.className : '',
        'border-b dark:border-grey-600 hover:bg-grey-100 dark:hover:bg-grey-600 bg-grey-0 dark:bg-grey-700'
      )}>
      {props.children}
    </tr>
  );
}
