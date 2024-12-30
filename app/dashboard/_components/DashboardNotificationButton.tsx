import { HiBell } from 'react-icons/hi2';

export default function DashboardNotificationButton() {
  return (
    <button
      type='button'
      className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
      <span className='sr-only'>View notifications</span>
      <HiBell className='h-6 w-6' aria-hidden='true' />
    </button>
  );
}
