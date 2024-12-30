import { classNames } from '@/app/_utils/helpers';

type HeadingProps = {
  as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
};

export default function Heading(props: HeadingProps) {
  if (props.as === 'h2') {
    return (
      <h2
        className={classNames(
          props.className ? props.className : '',
          'text-4xl font-bold text-grey-700 dark:text-grey-0'
        )}>
        {props.children}
      </h2>
    );
  }

  if (props.as === 'h3') {
    return (
      <h3
        className={classNames(
          props.className ? props.className : '',
          'text-2xl font-semibold text-grey-700 dark:text-grey-0'
        )}>
        {props.children}
      </h3>
    );
  }

  if (props.as === 'h4') {
    return (
      <h4
        className={classNames(
          props.className ? props.className : '',
          'text-xl font-semibold text-grey-700 dark:text-grey-0'
        )}>
        {props.children}
      </h4>
    );
  }

  if (props.as === 'h5') {
    return <h5>{props.children}</h5>;
  }

  if (props.as === 'h6') {
    return <h6>{props.children}</h6>;
  }
}
