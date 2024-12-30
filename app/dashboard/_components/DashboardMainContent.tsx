export default function DashboardMainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex-1 bg-grey-100 dark:bg-grey-900'>
      <div className='py-6'>{children}</div>
    </div>
  );
}
