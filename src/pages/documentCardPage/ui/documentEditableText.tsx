import type React from 'react';

import { documentsStore } from '@/entities/documents';
import { EditNote } from '@mui/icons-material';
import { TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface EditableTextProps {
  isCreator: boolean;
  name: string;
}

const EditableText: React.FC<EditableTextProps> = ({ isCreator }) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  return (
    <>
      {isEditing && isCreator ? (
        <TextField
          value={text}
          onChange={handleChange}
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
              cursor: isCreator ? 'pointer' : 'default',
            }}
            onClick={handleClick}
          >
            {text} {isCreator && !isEditing && <EditNote />}
          </Typography>
        </>
      )}
    </>
  );
};

export default EditableText;
