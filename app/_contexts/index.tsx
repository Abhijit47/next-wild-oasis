'use client';

import dynamic from 'next/dynamic';

export const DarkModeProvider = dynamic(
  () => import('./DarkModeContext').then((mod) => mod.DarkModeProvider),
  {
    ssr: false,
  }
);
