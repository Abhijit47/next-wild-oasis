import { classNames } from '@/app/_utils/helpers';

export default function TableWrapper(props: TableWrapperProps) {
  return (
    <div className={classNames('overflow-x-auto bg-grey-0 dark:bg-grey-700')}>
      {props.children}
    </div>
  );
}
