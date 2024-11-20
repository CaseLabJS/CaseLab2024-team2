import { attributesStore } from '@/entities/attribute';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Box,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import style from './attributeList.module.css';

const AttributeList = observer(() => {
  const [querySearch, setQuerySearch] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuerySearch(event.target.value);
  };

  const onSubmitQuery = (): void => {
    if (querySearch.trim()) {
      //тут поиск
    }
  };

  function handleClick(e: React.MouseEvent): void {
    e.preventDefault();
    onSubmitQuery();
  }

  function handleKeyPress(e: React.KeyboardEvent): void {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmitQuery();
    }
  }

  const handleRemoveAttribute = async (id: number): Promise<void> => {
    try {
      await attributesStore.deleteById(id);
    } catch {
      alert('Ошибка удаления');
    }
  };

  useEffect(() => {
    attributesStore.load().catch(() => alert('Ошибка'));
  }, []);
  return (
    <Box className={style.container}>
      <Stack direction="column" margin="5px">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box className={style.buttonAdd}>
            <AddIcon color="primary" />
            <Typography color="primary.main" className={style.textButtonAdd}>
              Добавить
            </Typography>
          </Box>
          <TextField
            id="search"
            type="text"
            slotProps={{
              input: {
                startAdornment: <SearchIcon fontSize="small" onClick={handleClick} color="disabled" />,
              },
            }}
            placeholder="Search..."
            variant="standard"
            sx={{ width: '30%' }}
            value={querySearch}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            autoComplete="off"
          />
        </Stack>

        <TableContainer component="div" className={style.table}>
          <Table size="small" aria-label="users table">
            <colgroup>
              <col style={{ width: '8%' }} />
              <col style={{ width: '46%' }} />
              <col style={{ width: '46%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell align="left"></TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Тип</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attributesStore.attributes.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="left">
                    <DeleteIcon className={style.deleteIcon} onClick={() => handleRemoveAttribute(item.id)} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
});

export default AttributeList;
