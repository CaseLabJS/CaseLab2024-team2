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
import { documentsStore } from '@/entities/documents';
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
  const [formData, setFormData] = useState<{ [key: number]: string }>({}); // Состояние для данных формы
  const [documentName, setDocumentName]=useState("");
  
  const attributes = documentsStore.currentDocument?.latest_version.attributes.map((attribute) => ({
    id: attribute.id,
    attributeName: attribute.name,
    attributeType: attribute.type,
    attributeValue: attribute.value,
  }));
  const handleFileChange = (file: File):void => {
    setSelectedFile(file);
  };
  const handleChange = (attributeId: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [attributeId]: event.target.value });
  };
  const handleChangeName=(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void=>{
    setDocumentName(event.target.value)
  }
  const handleSubmit = async (): Promise<void> => {
    const entries = Object.entries(formData);
    const patchValueRequest = entries.map(([key, keyValue]) => {
      const attributeId = parseInt(key, 10); 
      if (isNaN(attributeId)) {
        console.error("Ошибка: ключ не является числом:", key);
        return null; 
      }
      return {
        attributeId,
        value: keyValue,
      };
    }).filter(item => item !== null); // Убираем null значения
    const patch={
      document_type_id: documentsStore.currentDocument?.document.document_type_id as number,
      name: documentName,
      version_attributes: patchValueRequest
    }
    try{
      const id=documentsStore.currentDocument?.document.id;
      if (!id) {
        throw new Error("ID документа не найден.");
      }
      await documentsStore.updateDocumentById(id, patch);
    
      handleClose(); 
    } catch(e){
      console.log(e)
    }
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
            Редактирование документа
          </Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <StyledTextField label="Название документа" onChange={(e)=>handleChangeName(e)}/>
        {attributes?.map((attribute) => {
          return (
          <StyledTextField key={attribute.id} label={attribute.attributeName} type={attribute.attributeType} 
          onChange={(e) => handleChange(attribute.id, e)} 
            value={formData[attribute.id] || ''} 
            />
          )
        })}
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