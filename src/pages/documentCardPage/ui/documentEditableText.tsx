import type React from 'react';

import { documentsStore } from '@/entities/documents';
import { EditNote } from '@mui/icons-material';
import { TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface EditableTextProps {
  isEditMode: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ isEditMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { name: documentName, id } = documentsStore.currentDocument!.document;
  const [text, setText] = useState(documentName);
  useEffect(() => {
    setText(documentName);
  }, [documentName]);

  const handleClick = (): void => {
    setIsEditing(true);
  };

  const handleBlur = async (): Promise<void> => {
    setIsEditing(false);
    if (text.trim()) {
      await documentsStore.updateDocumentById(id, { document_params: { name: text } });
    } else {
      setText(documentName);
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (event.key === 'Enter') {
      await handleBlur();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  return (
    <>
      {isEditing && isEditMode ? (
        <TextField
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
          variant="standard"
          sx={{
            fontSize: '34px',
            fontWeight: '300',
            margin: '8px',
            maxWidth: '90%',
            '& .MuiInputBase-input': {
              fontSize: '34px',
              fontWeight: '300',
              padding: 0,
              letterSpacing: '0.5px',
              height: '40px',
              backgroundColor: '#f5f5f5',
            },
            '& .MuiInput-underline:before, & .MuiInput-underline:after': {
              borderBottom: 'none',
            },
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
      ) : (
        <>
          <Typography
            variant="h1"
            sx={{
              fontSize: '34px',
              fontWeight: '300',
              letterSpacing: '0.5px',
              margin: '8px',
              height: '40px',
              maxWidth: '90%',
              cursor: isEditMode ? 'pointer' : 'default',
              backgroundColor: !isEditing && isEditMode ? '#f5f5f5' : 'inherit',
            }}
            onClick={handleClick}
          >
            {text} {!isEditing && isEditMode && <EditNote />}
          </Typography>
        </>
      )}
    </>
  );
};

export default EditableText;
