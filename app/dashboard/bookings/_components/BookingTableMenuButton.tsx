import { ModalProvider } from '@/app/_contexts/ModalContext';
import {
  deleteBooking,
  updateBooking,
} from '@/app/_lib/services/bookings.services';
import DeleteModal from '../../_components/shared/DeleteModal';
import BookingRowDropDown from './BookingRowDropDown';

export default function BookingTableMenuButton({
  booking,
}: {
  booking: Booking;
}) {
  return (
    <ModalProvider>
      <BookingRowDropDown booking={booking} onCheckOut={updateBooking} />
      <DeleteModal
        resourceName='booking'
        resourceId={booking.id}
        onConfirm={deleteBooking}
      />
    </ModalProvider>
  );
}
