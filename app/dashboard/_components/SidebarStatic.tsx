import SidebarLinks from './SidebarLinks';
import SidebarLogo from './SidebarLogo';
import Uploader from './Uploader';

export default function SidebarStatic() {
  return (
    <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className='flex flex-col flex-grow pt-5 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-grey-0 dark:bg-gray-800'>
        <SidebarLogo />
        <aside className='flex flex-col flex-grow mt-5'>
          <nav className='flex-1 px-2 pb-4 space-y-1'>
            <SidebarLinks />
          </nav>
        </aside>

        <Uploader />
      </div>
    </div>
  );
}
