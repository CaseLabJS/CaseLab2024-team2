import type { ReactElement } from 'react';

import { AddAttribute } from '@/widgets/attributeWidget';
import { CreateUser } from '@/widgets/createUser';
import { Stack } from '@mui/material';
import { NewDocumentTypeWidget } from '@/widgets/newDocumentTypeWidget';

const AdminMainPage = (): ReactElement => {
  return (
    <Stack direction="row" columnGap="30px">
      <CreateUser />
      <AddAttribute />
      <NewDocumentTypeWidget />
    </Stack>
  );
};
export default AdminMainPage;
