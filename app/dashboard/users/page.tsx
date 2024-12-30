import DashboardMainContent from '../_components/DashboardMainContent';
import DashboardMainContentInner from '../_components/DashboardMainContentInner';
import DashboardMainContentShell from '../_components/DashboardMainContentShell';
import DashboardPageTitle from '../_components/DashboardPageTitle';
import NewUserForm from '../_components/forms/NewUserForm';

export default function UsersPage() {
  return (
    <DashboardMainContent>
      <DashboardMainContentInner>
        <DashboardPageTitle />
        <DashboardMainContentShell>
          <NewUserForm />
        </DashboardMainContentShell>
      </DashboardMainContentInner>
    </DashboardMainContent>
  );
}
