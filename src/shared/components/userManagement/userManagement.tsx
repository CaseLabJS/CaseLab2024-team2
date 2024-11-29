import type { UserResponse } from '@/entities/user';

import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { userStore } from '../../../entities/user/model/store/userStore';

import styles from './userManagement.module.css';
const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const UserManagement = observer(() => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [canShowForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = searchTerm
    ? userStore.users.filter((user: UserResponse) => {
        return (
          // user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.display_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : userStore.users;

  const handleAddUser = async (): Promise<void> => {
    try {
      await userStore.createUser({ email, display_name: name, password });
      setName('');
      setEmail('');
      setPassword('');
      setShowForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleRemoveUser = async (emailToRemove: string): Promise<void> => {
    try {
      await userStore.deleteUser({ email: emailToRemove });
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className={styles.user_management_container}>
      <div className={styles.data_grid_table}>
        <div className={styles.button_and_search}>
          <div className={styles.button_add}>
            <Button
              variant="contained"
              onClick={() => setShowForm(!canShowForm)}
              sx={{ backgroundColor: 'white', color: '#4e82d0', height: '32px', boxShadow: 'none' }}
            >
              <span className={styles.add_user_button_before}>Добавить</span>
            </Button>
          </div>
          <SearchContainer className={styles.search_container}>
            <SearchIcon />
            <input
              className={styles.searchButton}
              value={searchTerm}
              placeholder="Search..."
              onChange={handleSearchChange}
              // variant="outlined"
            />
          </SearchContainer>
        </div>

        {canShowForm && (
          <div className={styles.user_form}>
            <TextField
              label="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              label="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              label="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
            />
            <Button variant="contained" onClick={handleAddUser} className={styles.submit_button}>
              Сохранить
            </Button>
          </div>
        )}

        <TableContainer component="div" className={styles.user_table}>
          <Table size="small" aria-label="users table">
            <colgroup>
              <col style={{ width: '7%' }} />
              <col style={{ width: '31%' }} />
              <col style={{ width: '31%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell align="left"></TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user: UserResponse, index) => (
                <TableRow key={index}>
                  <TableCell align="left">
                    <DeleteIcon className={styles.delete_icon} onClick={() => handleRemoveUser(user.email)} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.display_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  {/* <TableCell>{user.password}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
});

export default UserManagement;
