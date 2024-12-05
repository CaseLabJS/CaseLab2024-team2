import type { ReactElement } from 'react';

import { AddAttribute } from '@/widgets/attributeWidget';
import { CreateUser } from '@/widgets/createUser';
import { NewDocumentTypeWidget } from '@/widgets/newDocumentTypeWidget';
import { Stack } from '@mui/material';

const AdminMainPage = (): ReactElement => {
  return (
    <Stack direction="row" alignItems="flex-start" columnGap="30px">
      <CreateUser />
      <AddAttribute />
      <NewDocumentTypeWidget />
    </Stack>
  );
};
export default AdminMainPage;
