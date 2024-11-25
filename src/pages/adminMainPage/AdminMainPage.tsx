import type { ReactElement } from 'react';

import { AddAttribute } from '@/widgets/attributeWidget';
import { CreateUser } from '@/widgets/createUser';
import { Stack } from '@mui/material';

const AdminMainPage = (): ReactElement => {
  return (
    <Stack direction="row">
      <AddAttribute />
      <CreateUser />
    </Stack>
  );
};
export default AdminMainPage;
