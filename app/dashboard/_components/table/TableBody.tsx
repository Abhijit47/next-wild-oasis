import { classNames } from '@/app/_utils/helpers';

export default function TableBody(props: TableBodyProps) {
  return (
    <tbody className={classNames(props.className ? props.className : '')}>
      {props.children}
    </tbody>
  );
}
