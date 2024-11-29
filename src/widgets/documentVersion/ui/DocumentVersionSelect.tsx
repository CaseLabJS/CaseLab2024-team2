import type { SelectChangeEvent } from '@mui/material';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, type ReactElement } from 'react';

const DocumentVersionSelect = (): ReactElement => {
  const [version, setVersion] = useState<string>('100502'); // TODO последняя версия документа
  const handleChange = (event: SelectChangeEvent<string>): void => {
    setVersion(event.target.value);
    console.log(event.target.value);
  };

  return (
    <FormControl sx={{ marginLeft: 'auto' }}>
      <InputLabel>Версия</InputLabel>
      <Select label="Версия" value={version} onChange={(event) => handleChange(event)}>
        <MenuItem value="100502">v1.0.2</MenuItem>
        <MenuItem value="100501">v1.0.1</MenuItem>
        <MenuItem value="100500">v1.0.0</MenuItem>
      </Select>
    </FormControl>
  );
};

export { DocumentVersionSelect };
