import type { Deadline } from '@/entities/vote/model/types/deadline.type';
import type { SelectChangeEvent } from '@mui/material';

import { userStore } from '@/entities/user';
import { votingStore } from '@/entities/vote';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, Typography, Box, Stack, Select, MenuItem, Chip, Modal } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import style from './createVotingWidget.module.css';

const threshold_values: number[] = [0.6, 0.7, 0.8, 0.9, 1];

const CreateVoting = observer((): ReactElement => {
  const users = userStore.users.map((user) => user.email);

  const { documentId } = useParams();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [threshold, setThreshold] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setSelectedUsers([]);
    setName('');
    setDay(0);
    setTime(0);
    setIsOpen(false);
    setThreshold('');
    setIsOpen(false);
  };

  const handleChangeTeams = (event: SelectChangeEvent<string>): void => {
    setThreshold(event.target.value);
  };

  const handleChangeUser = (event: SelectChangeEvent<typeof selectedUsers>): void => {
    setSelectedUsers(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
  };

  async function handleSubmit(): Promise<void> {
    try {
      const deadline = `P${day}DT${time}H` as unknown as Deadline;
      await votingStore.createVoting({
        name,
        threshold: Number(threshold),
        deadline,
        documentId: Number(documentId),
        emails: selectedUsers,
      });
      setSelectedUsers([]);
      setName('');
      setDay(0);
      setTime(0);
      setIsOpen(false);
      setThreshold('');
    } catch {
      alert('Ошибка создания');
    }
  }

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpen}>
        Создать голосование
      </Button>
      <Modal open={isOpen} onClose={handleClose}>
        <Box className={style.boxCreate}>
          <CloseIcon color="primary" className={style.stylelinkIcon} onClick={handleClose} />
          <Stack direction="column" gap="20px" marginBottom="40px">
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
            <Stack>
              <Typography color="textDisabled">Выбор пользователей</Typography>
              {users.length > 0 && (
                <Select
                  multiple
                  value={selectedUsers}
                  onChange={handleChangeUser}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <Box sx={{ height: '150px', overflowY: 'scroll' }}>
                    {users.map((item: string) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Box>
                </Select>
              )}
            </Stack>
            <Stack>
              <Typography color="textDisabled">Порог</Typography>
              <Select id="select-threshold" value={String(threshold)} onChange={handleChangeTeams}>
                {threshold_values.map((item: number) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack direction="row" gap="5px">
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
            </Stack>
          </Stack>
          <Button disabled={!name || !threshold} onClick={handleSubmit} variant="contained" className={style.btnCreate}>
            Отправить
          </Button>
        </Box>
      </Modal>
    </Box>
  );
});

export default CreateVoting;
