'use client';

import { useRouter } from 'next/navigation';

export default function useMoveBack(): () => void {
  const router = useRouter();

  const moveBack = () => {
    router.back();
  };

  return moveBack;
}
