import { classNames } from '@/app/_utils/helpers';

export default function Table(props: TableProps) {
  return (
    <table
      className={classNames('min-w-full text-left text-xs whitespace-nowrap')}>
      {props.children}
    </table>
  );
}
