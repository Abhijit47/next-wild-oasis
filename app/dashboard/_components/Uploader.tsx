import {
  uploadAll,
  uploadBookings,
} from '@/app/_lib/actions/sampledata.actions';
import Heading from './shared/Heading';
import UploaderButton from './UploaderButton';

export default function Uploader() {
  return (
    <div className={'p-4 bg-brand-200 m-4 rounded-lg grid gap-y-2'}>
      <Heading as={'h4'} className={'text-center'}>
        Sample Data
      </Heading>
      <form action={uploadAll}>
        <UploaderButton>Upload All</UploaderButton>
      </form>
      <form action={uploadBookings}>
        <UploaderButton>Upload bookings only</UploaderButton>
      </form>
    </div>
  );
}
