import { CreateAttribute } from '@/features/createAttribute';
import { SearchForm } from '@/shared/components';
import { useSearch, useDebounce } from '@/shared/hooks';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, Typography, Modal } from '@mui/material';
import { useState, type ReactElement } from 'react';

import { AttributeTable } from '.';

import style from './attributeList.module.css';

const AttributeList = (): ReactElement => {
  const { querySearch, handleSearchChange } = useSearch();
  const debounceValue = useDebounce(querySearch, 400);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <Box className={style.container}>
      <Stack direction="column">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box className={style.buttonAdd} onClick={handleOpen}>
            <AddIcon color="primary" />
            <Typography color="primary.main" className={style.textButtonAdd}>
              Добавить
            </Typography>
          </Box>
          <Modal open={isOpen} onClose={handleClose}>
            <Box className={style.boxCreateAttribute}>
              <Box className={style.styleExitIcon} onClick={handleClose}>
                <CloseIcon color="primary" />
              </Box>
              <CreateAttribute />
            </Box>
          </Modal>
          <SearchForm id="search-attributes" value={querySearch} onChange={handleSearchChange} />
        </Stack>
        <AttributeTable debounceValue={debounceValue} />
      </Stack>
    </Box>
  );
};

export default AttributeList;
