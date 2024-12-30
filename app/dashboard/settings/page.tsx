import { getSettings } from '@/app/_lib/services/settings.services';
import DashboardMainContent from '../_components/DashboardMainContent';
import DashboardMainContentInner from '../_components/DashboardMainContentInner';
import DashboardMainContentShell from '../_components/DashboardMainContentShell';
import DashboardPageTitle from '../_components/DashboardPageTitle';
import UpdateSettingsForm from '../_components/forms/UpdateSettingsForm';

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <DashboardMainContent>
      <DashboardMainContentInner>
        <DashboardPageTitle />
        <DashboardMainContentShell>
          <UpdateSettingsForm prevSettings={settings} />
        </DashboardMainContentShell>
      </DashboardMainContentInner>
    </DashboardMainContent>
  );
}
