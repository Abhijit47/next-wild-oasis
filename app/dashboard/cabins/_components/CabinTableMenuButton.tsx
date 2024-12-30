import { ModalProvider } from '@/app/_contexts/ModalContext';
import { deleteCabin } from '@/app/_lib/services/cabins.services';
import EditCabinForm from '../../_components/forms/EditCabinForm';
import DeleteModal from '../../_components/shared/DeleteModal';
import Modal from '../../_components/shared/Modal';
import CabinDropDown from './CabinDropDown';

export default function CabinTableMenuButton({ cabin }: { cabin: Cabin }) {
  return (
    <ModalProvider>
      <CabinDropDown cabin={cabin} />
      <Modal render={<EditCabinForm cabin={cabin} />} />
      <DeleteModal
        resourceName='cabin'
        resourceId={cabin.id}
        onConfirm={deleteCabin}
      />
    </ModalProvider>
  );
}
