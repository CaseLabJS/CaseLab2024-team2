import type { ReactElement } from 'react';

import { SearchForm } from '@/shared/components';
import { Add } from '@mui/icons-material';
import { Toolbar, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface DocumentTableToolbarProps {
  isShowSignedOnly: boolean;
  setIsShowSignedOnly: (value: boolean) => void;
  setPage: (page: number) => void;
}

const DocumentsTableToolbar = ({
  isShowSignedOnly,
  setIsShowSignedOnly,
  setPage,
}: DocumentTableToolbarProps): ReactElement => {
  return (
    <Toolbar
      sx={{
        paddingLeft: { xs: 0, sm: 0 },
        paddingRight: { xs: 0, sm: 0 },
      }}
    >
      <Button variant="text" startIcon={<Add />} sx={{ marginRight: 2 }}>
        Добавить
      </Button>
      <FormControl
        size="small"
        sx={{
          margin: '0 auto',
        }}
      >
        <RadioGroup
          row
          value={isShowSignedOnly}
          onChange={(e) => {
            const isValue = e.target.value === 'true' ? true : false;
            setIsShowSignedOnly(isValue);
            setPage(0);
          }}
        >
          <FormControlLabel value={false} control={<Radio size="small" />} label="Все" />
          <FormControlLabel value={true} control={<Radio size="small" />} label="Подписанные" />
        </RadioGroup>
      </FormControl>
      <SearchForm sx={{ marginLeft: 'auto', marginRight: 2 }} />
    </Toolbar>
  );
};

export default DocumentsTableToolbar;
