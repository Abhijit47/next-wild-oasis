import { classNames } from '@/app/_utils/helpers';

export default function TableHeader(props: TableHeaderProps) {
  return (
    <th
      scope={props.scope ? props.scope : 'col'}
      className={classNames(
        props.className ? props.className : '',
        'px-6 py-4'
      )}>
      {props.children}
    </th>
  );
}
