import { SidebarProvider } from '../_contexts/SidebarContext';
import DashboardHeader from './_components/DashboardHeader';
import SidebarDrawer from './_components/SidebarDrawer';
import SidebarStatic from './_components/SidebarStatic';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      {/* Mobile sidebar */}
      <SidebarDrawer />

      {/* Static sidebar for desktop */}
      <SidebarStatic />

      <main className='md:pl-64 flex flex-col flex-1'>
        <DashboardHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
