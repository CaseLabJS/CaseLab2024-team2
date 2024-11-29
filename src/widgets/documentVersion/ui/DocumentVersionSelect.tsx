import type { SelectChangeEvent } from '@mui/material';
import type { ReactElement } from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const DocumentVersionSelect = (): ReactElement => {
  const handleChange = (event: SelectChangeEvent<string>): void => {
    console.log(event.target.value);
  };

  return (
    <FormControl sx={{ marginLeft: 'auto' }}>
      <InputLabel>Версия</InputLabel>
      <Select label="Версия" value={'100500'} onChange={(event) => handleChange(event)}>
        <MenuItem value="100500">v1.0.0</MenuItem>
        <MenuItem value="100501">v1.0.1</MenuItem>
        <MenuItem value="100502">v1.0.2</MenuItem>
      </Select>
    </FormControl>
  );
};

export { DocumentVersionSelect };
