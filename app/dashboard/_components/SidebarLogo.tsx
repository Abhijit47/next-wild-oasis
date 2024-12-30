'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SidebarLogo() {
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
    <div className='px-4'>
      <Link href='/dashboard' className={'flex items-center flex-shrink-0'}>
        <Image
          className='h-28 w-auto mx-auto'
          src={src}
          alt='Wild Oasis Logo'
          width={300}
          height={213}
          priority
        />
      </Link>
    </div>
  );
}
