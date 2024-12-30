import { HiEllipsisVertical } from 'react-icons/hi2';
import DropDownMenu from '../shared/DropDownMenu';

export default function TableMenuButton() {
  return (
    // <button className='bg-grey-200 hover:bg-grey-300 p-2 rounded-md'>
    //   <HiEllipsisVertical className='inline-block h-4 w-4' />
    // </button>
    <DropDownMenu buttonName='Actions' icon={<HiEllipsisVertical />} srOnly />
  );
}
