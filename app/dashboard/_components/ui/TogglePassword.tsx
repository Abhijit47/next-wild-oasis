'use client';

import { useState } from 'react';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

export default function TogglePassword() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisible((prev) => !prev);
  }

  return (
    <div>
      {isPasswordVisible ? (
        <button
          className='absolute top-5.5 right-2'
          // onClick={togglePasswordVisibility}
          onClickCapture={togglePasswordVisibility}>
          <HiEyeSlash className='text-grey-700 dark:text-grey-0' />
        </button>
      ) : (
        <button
          className='absolute top-5.5 right-2'
          onClickCapture={togglePasswordVisibility}>
          <HiEye className='text-grey-700 dark:text-grey-0' />
        </button>
      )}
    </div>
  );
}
