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
          startAdornment: <SearchIcon fontSize="small" />,
        },
      }}
      placeholder="Search..."
      variant="standard"
      size="medium"
      autoComplete="off"
      {...props}
    />
  );
};

export default SearchForm;
