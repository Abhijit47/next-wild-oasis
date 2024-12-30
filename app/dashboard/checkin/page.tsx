import { permanentRedirect } from 'next/navigation';

export default function CheckInPage() {
  return permanentRedirect('/dashboard/bookings');
}
