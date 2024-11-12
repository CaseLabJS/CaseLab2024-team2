import type { ReactElement } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Box, Stack } from '@mui/material';
import { addAttributeDoc } from '@/entities/attribute/api';
import style from './AttributeWidget.module.css';
import iconLink from '@/assets/Vector.svg';
import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';

const AddAttribute = (): ReactElement => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');

  async function handleSubmit(): Promise<void> {
    await addAttributeDoc({ name, type }); //при изменении attribute store, можно вызывать оттуда
  }
  return (
    <Box className={style.boxCreateAttribute}>
      <Link to={ROUTE_CONSTANTS.CREATE_ATTRIBUTE.path} className={style.stylelinkIcon}>
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
