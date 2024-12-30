import { getUser } from '@/app/_lib/services/user.services';
import UpdatePasswordForm from '@/app/dashboard/_components/forms/UpdatePasswordForm';
import UpdateUserDataForm from '@/app/dashboard/_components/forms/UpdateUserDataForm';
import { unauthorized } from 'next/navigation';
import DashboardMainContent from '../_components/DashboardMainContent';
import DashboardMainContentInner from '../_components/DashboardMainContentInner';
import DashboardMainContentShell from '../_components/DashboardMainContentShell';
import DashboardPageTitle from '../_components/DashboardPageTitle';

export default async function AccountPage() {
  const user = await getUser();

  if (!user) {
    unauthorized();
  }

  return (
    <DashboardMainContent>
      <DashboardMainContentInner>
        <DashboardPageTitle />
        <DashboardMainContentShell>
          <div className={'space-y-8'}>
            <UpdateUserDataForm user={user} />

            <UpdatePasswordForm />
          </div>
        </DashboardMainContentShell>
      </DashboardMainContentInner>
    </DashboardMainContent>
  );
}
