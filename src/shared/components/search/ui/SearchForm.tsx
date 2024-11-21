import type { TextFieldProps } from '@mui/material';
import type { ReactElement } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

const SearchForm = (props: TextFieldProps): ReactElement => {
  return (
    <TextField
      type="text"
      slotProps={{
        input: {
          startAdornment: <SearchIcon fontSize="small" color="disabled" />,
        },
      }}
      placeholder="Search..."
      variant="standard"
      sx={{ width: '30%' }}
      autoComplete="off"
      {...props}
    />
  );
};

export default SearchForm;
