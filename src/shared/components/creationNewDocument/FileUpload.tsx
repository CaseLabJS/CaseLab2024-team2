import { useState } from 'react';
import { TextField} from '@mui/material';
import { styled } from '@mui/material/styles';


const FileUploadField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& > fieldset': {
      border: '1px solid #ccc',
    },
  },
});
const FileUpload: React.FC<{ onChange: (file: File) => void }> = ({ onChange }) => {
  const [fileInputValue, setFileInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
      setFileInputValue(file.name);
    }
  };

    return (
    <FileUploadField
        id="standard-basic"
        variant="outlined"
        type="file"
        onChange={handleInputChange}
        value={fileInputValue}
        inputProps={{ accept: "image/*, application/pdf" }} // Разрешение типов файлов
    />
  );
};

export default FileUpload;