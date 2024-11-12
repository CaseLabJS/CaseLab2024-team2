import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import iconLink from '@/assets/Vector.svg';
import { addAttributeDoc } from '@/entities/attribute/api';
import { Button, TextField, Typography, Box, Stack } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { Link } from 'react-router-dom';

import style from './fattributeWidget.module.css';

const AddAttribute = (): ReactElement => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');

  async function handleSubmit(): Promise<void> {
    await addAttributeDoc({ name, type }); //при изменении attribute store, можно вызывать оттуда
  }
  return (
    <Box className={style.boxCreateAttribute}>
      <Link to={ROUTE_CONSTANTS.ATTRIBUTES.path} className={style.stylelinkIcon}>
        <img src={iconLink} alt="" />
      </Link>
      <Stack direction="column" gap="13px" marginBottom="80px">
        <Typography variant="h6" className={style.titleAddAttribute}>
          Создать аттрибут
        </Typography>
        <TextField
          id="input-add-attribute-name"
          placeholder="Название"
          variant="standard"
          className={style.inputAttribute}
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
          id="input-add-attribute-type"
          placeholder="Тип"
          variant="standard"
          className={style.inputAttribute}
          value={type}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setType(event.target.value);
          }}
        />
      </Stack>
      <Button disabled={!name || !type} onClick={handleSubmit} variant="contained" className={style.btnCreate}>
        Сохранить
      </Button>
    </Box>
  );
};

export default AddAttribute;
