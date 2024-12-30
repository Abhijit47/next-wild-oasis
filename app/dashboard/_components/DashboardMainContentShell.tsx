import { classNames } from '@/app/_utils/helpers';

type DashboardMainContentShellProps = React.ComponentProps<'div'> &
  React.PropsWithChildren<object>;

export default function DashboardMainContentShell(
  props: DashboardMainContentShellProps
) {
  return (
    <div className={'py-4'}>
      <div
        className={classNames(
          'border border-dashed border-grey-700 dark:border-gray-200 rounded-lg h-full p-2',
          props.className ? props.className : ''
        )}>
        {props.children}
      </div>
    </div>
  );
}
