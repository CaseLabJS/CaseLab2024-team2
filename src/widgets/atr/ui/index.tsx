import { Button, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
//тут импорт addAttributeDoc

export const AddAttribute = () => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');

  const handleSubmit = () => {
    //addAttributeDoc(name, type);
  };
  return (
    <FormControl>
      <TextField
        id="input-add-attribute-name"
        label="Название"
        placeholder="Добавьте название аттрибута"
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}
      />
      <TextField
        id="input-add-attribute-type"
        label="Тип"
        placeholder="Добавьте тип аттрибута"
        value={type}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setType(event.target.value);
        }}
      />
      <Button disabled={name === '' && type === ''} onClick={handleSubmit} variant="outlined">
        Сохранить
      </Button>
    </FormControl>
  );
};
