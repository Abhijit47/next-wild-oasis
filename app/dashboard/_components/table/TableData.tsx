import { classNames } from '@/app/_utils/helpers';

export default function TableData(props: TableDataProps) {
  return (
    <td className={classNames(props.className ? props.className : 'px-6 py-4')}>
      {props.children}
    </td>
  );
}
