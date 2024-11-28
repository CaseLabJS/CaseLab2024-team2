import type React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  styled,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';

import FileUpload from './FileUpload'; 

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
}));

interface DocumentFormModalProps {
  open: boolean;
  handleClose: () => void;
}

const DocumentFormModal: React.FC<DocumentFormModalProps> = ({ open, handleClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [canCreatePoll, setCreatePoll] = useState(false);

  const handleFileChange = (file: File):void => {
    setSelectedFile(file);
  };

  const handleSubmit = ():void => {
    // Здесь должна быть логика сохранения данных
    console.log('Данные сохранены:', { selectedFile, canCreatePoll });
    handleClose(); // Закрываем модальное окно
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <Box
        sx={{
          backgroundColor: 'white',
          p: 3,
          borderRadius: 8,
          width: '500px',
          maxWidth: '90%', // Ограничение ширины
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            Создание нового документа
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <StyledTextField label="Название документа" multiline />
        <StyledTextField label="Описание" multiline />
        <StyledTextField label="Дата" type="date" />
        <StyledTextField label="Автор" />
        <FileUpload onChange={handleFileChange} />
        <div style={{display:'flex',flexDirection:'row', alignItems:"center", marginTop:5}}>
            <FormControlLabel
                sx={{maxWidth:'50%'}}
                control={<Checkbox checked={canCreatePoll} onChange={(e) => setCreatePoll(e.target.checked)} />}
                label="Создать голосование"
            />
            <Box sx={{ width:'50%', display: 'flex', height:'50px', justifyContent: 'flex-end'}}>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
                Сохранить
            </Button>
            </Box>
        </div>
      </Box>
    </Modal>
  );
};

export default DocumentFormModal;