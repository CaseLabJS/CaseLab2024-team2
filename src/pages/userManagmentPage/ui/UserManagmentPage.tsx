import type { ReactElement } from 'react';

import { NavTabs, UserManagement } from '@/shared/components';

const UserManagmentPage = (): ReactElement => {
  return (
    <>
      <NavTabs created />
      <UserManagement />
    </>
  );
};

export default UserManagmentPage;
