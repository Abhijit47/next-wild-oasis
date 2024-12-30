'use client';

import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { useTheme } from 'next-themes';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Heading from '../shared/Heading';

export default function SalesChart(props: SalesChartProps) {
  const { bookings, numDays } = props;
  const { resolvedTheme } = useTheme();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data: SaleData[] = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors =
    resolvedTheme === 'dark'
      ? {
          totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
          extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
          text: '#e5e7eb',
          background: '#18212f',
        }
      : {
          totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
          extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
          text: '#374151',
          background: '#fff',
        };

  return (
    <figure
      className={
        'h-full w-full rounded-lg p-4 bg-grey-0 dark:bg-grey-700 space-y-6'
      }>
      <Heading as='h3'>
        Sales from{' '}
        {allDates.at(0) ? format(allDates.at(0) as Date, 'MMM dd yyyy') : 'N/A'}{' '}
        &mdash;{' '}
        {allDates.at(-1)
          ? format(allDates.at(-1) as Date, 'MMM dd yyyy')
          : 'N/A'}
      </Heading>

      <ResponsiveContainer height={300} width={'100%'}>
        <AreaChart data={data}>
          <XAxis
            dataKey={'label'}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit='$'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray={'4'} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey='totalSales'
            type='monotone'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name='Total sales'
            unit='$'
          />
          <Area
            dataKey='extrasSales'
            type='monotone'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name='Extras sales'
            unit='$'
          />
        </AreaChart>
      </ResponsiveContainer>
    </figure>
  );
}
