'use client';

import DynamicComponentFallBack from '@/app/_components/shared/DynamicComponentFallBack';
import dynamic from 'next/dynamic';

export const DurationChart = dynamic(() => import('./DurationChart'), {
  ssr: false,
  loading: () => <DynamicComponentFallBack />,
});

export const SalesChart = dynamic(() => import('./SalesChart'), {
  ssr: false,
  loading: () => <DynamicComponentFallBack />,
});
