import { attributesStore } from '@/entities/attribute';
import { Button, TextField, Typography, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement } from 'react';

import style from './createAttribute.module.css';

const CreateAttribute = observer((): ReactElement => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');

  async function handleSubmit(): Promise<void> {
    try {
      await attributesStore.create({ name, type });
      setName('');
      setType('');
    } catch {
      alert('Что-то пошло не так. Ошибка создания аттрибута');
    }
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
});

export default CreateAttribute;
