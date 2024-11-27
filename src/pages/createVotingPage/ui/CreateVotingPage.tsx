import type { ReactElement } from 'react';

import { CreateVoting } from '@/widgets/createVotingWidget';
import { Stack } from '@mui/material';

const CreateVotingPage = (): ReactElement => {
  return (
    <Stack direction="row" justifyContent="center">
      <CreateVoting />
    </Stack>
  );
};

export default CreateVotingPage;
