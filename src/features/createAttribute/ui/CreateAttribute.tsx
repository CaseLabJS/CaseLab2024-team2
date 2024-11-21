import { addAttributeDoc } from '@/entities/attribute/api';
import { Button, TextField, Typography, Stack } from '@mui/material';
import { useState, type ReactElement } from 'react';

import style from './createAttribute.module.css';

const CreateAttribute = (): ReactElement => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');

  async function handleSubmit(): Promise<void> {
    await addAttributeDoc({ name, type }); //при изменении attribute store, можно вызывать оттуда
  }
  return (
    <>
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
    </>
  );
};

export default CreateAttribute;
