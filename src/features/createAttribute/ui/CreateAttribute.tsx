import { attributesStore } from '@/entities/attribute';
import { Button, TextField, Typography, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement } from 'react';

const CreateAttribute = observer((): ReactElement => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');

  async function handleSubmit(): Promise<void> {
    try {
      await attributesStore.create({ name, type });
      setName('');
      setType('');
    } catch {
      alert('Что-то пошло не так. Ошибка создания атрибута');
    }
  }

  return (
    <>
      <Stack direction="column" gap="13px">
        <Typography variant="h6" color="primary">
          Создать атрибут
        </Typography>
        <TextField
          id="input-add-attribute-name"
          placeholder="Название"
          variant="standard"
          sx={{ mt: '30px' }}
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
          id="input-add-attribute-type"
          placeholder="Тип"
          variant="standard"
          value={type}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setType(event.target.value);
          }}
        />
      </Stack>
      <Button
        disabled={!name || !type}
        onClick={handleSubmit}
        variant="contained"
        size="small"
        sx={{ marginTop: 'auto' }}
      >
        Создать
      </Button>
    </>
  );
});

export default CreateAttribute;
