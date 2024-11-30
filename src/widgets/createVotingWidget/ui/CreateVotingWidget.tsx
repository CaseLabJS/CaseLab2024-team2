import type { Deadline } from '@/entities/vote/model/types/deadline.type';
import type { SelectChangeEvent } from '@mui/material';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import iconLink from '@/assets/iconLink.svg';
import { votingStore } from '@/entities/vote';
import { Button, TextField, Typography, Box, Stack, Select, MenuItem } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { useParams, Link } from 'react-router-dom';

import style from './createVotingWidget.module.css';

const threshold_values: number[] = [0.6, 0.7, 0.8, 0.9, 1];

const CreateVoting = (): ReactElement => {
  const { documentId } = useParams();

  const [name, setName] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [threshold, setThreshold] = useState<string>('');

  const handleChangeTeams = (event: SelectChangeEvent<string>): void => {
    setThreshold(event.target.value);
  };

  async function handleSubmit(): Promise<void> {
    //позже добавить запись пользователей которым доступно чтение
    try {
      const deadline = `P${day}DT${time}H` as unknown as Deadline;
      await votingStore.createVoting({
        name,
        threshold: Number(threshold),
        deadline,
        documentId: Number(documentId),
        emails: ['ivan@gmail.com'],
      });
    } catch {
      alert('Ошибка создания');
    }
  }
  //позже добавить возврат на страницу карточку документа
  return (
    <Box className={style.boxCreate}>
      <Link
        to={`${ROUTE_CONSTANTS.USER.path}${ROUTE_CONSTANTS.USER_DOCUMENTS.path}/${documentId}`}
        className={style.stylelinkIcon}
      >
        <img src={iconLink} alt="Изображение икноки перехода на предыдущую страницу" />
      </Link>
      <Stack direction="column" gap="30px" marginBottom="40px">
        <Typography variant="h6" className={style.titleCreate}>
          Создать голосование
        </Typography>
        <TextField
          id="input-voting-name"
          placeholder="Название"
          variant="standard"
          className={style.inputVoting}
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
          label="дней"
          value={day}
          className={style.inputVoting}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setDay(parseInt(e.target.value, 10) || 0)
          }
        />
        <TextField
          label="часов"
          value={time}
          className={style.inputVoting}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setTime(parseInt(e.target.value, 10) || 0)
          }
        />
        <Typography color="textDisabled">Порог</Typography>
        <Select id="select-threshold" value={String(threshold)} onChange={handleChangeTeams}>
          {threshold_values.map((item: number) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Button disabled={!name || !threshold} onClick={handleSubmit} variant="contained" className={style.btnCreate}>
        Отправить
      </Button>
    </Box>
  );
};

export default CreateVoting;
