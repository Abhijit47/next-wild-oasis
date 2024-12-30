'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { classNames } from '../_utils/helpers';

export default function Logo(props: { className?: string }) {
  // const [imageSource, setImageSource] = useState('/logo-light.png');
  const [mounted, setMounted] = useState(false);
  const { systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const src = systemTheme
    ? systemTheme === 'dark'
      ? '/logo-dark.png'
      : '/logo-light.png'
    : '/logo-light.png';

  return (
    <div className='flex items-center justify-center flex-shrink-0 px-4'>
      <Image
        className={classNames(props.className ? props.className : 'w-28 h-20')}
        src={src}
        alt='Wild Oasis Logo'
        width={300}
        height={213}
        priority
      />
    </div>
  );
}
