import { SearchForm } from '@/shared/components';
import { CreateDocumentDialog } from '@/widgets/createDocumentDialog';
import { Add, Delete } from '@mui/icons-material';
import { Toolbar, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useState, type ReactElement } from 'react';

interface DocumentTableToolbarProps {
  isShowSignedOnly: boolean;
  setIsShowSignedOnly: (value: boolean) => void;
  setPage: (page: number) => void;
}

const DocumentsTableToolbar = ({
  isShowSignedOnly,
  setIsShowSignedOnly,
  setPage,
}: DocumentTableToolbarProps): ReactElement => {
  const [isCreateDocumentDialogOpen, setCreateDocumentDialogState] = useState(false);
  
  return (
    <Toolbar
      sx={{
        paddingLeft: { xs: 0, sm: 0 },
        paddingRight: { xs: 0, sm: 0 },
      }}
    >
      <CreateDocumentDialog open={isCreateDocumentDialogOpen} onClose={() => setCreateDocumentDialogState(false)} />
      <Button
        variant="text"
        startIcon={<Add />}
        sx={{ marginRight: 2 }}
        onClick={() => setCreateDocumentDialogState(true)}
      >
        Добавить
      </Button>
      <Button variant="text" startIcon={<Delete sx={{ color: 'grey.500' }} />} sx={{ color: 'grey.500' }}>
        Удалить
      </Button>
      <FormControl
        size="small"
        sx={{
          margin: '0 auto',
        }}
      >
        <RadioGroup
          row
          value={isShowSignedOnly}
          onChange={(e) => {
            const isValue = e.target.value === 'true' ? true : false;
            setIsShowSignedOnly(isValue);
            setPage(0);
          }}
        >
          <FormControlLabel value={false} control={<Radio size="small" />} label="Все" />
          <FormControlLabel value={true} control={<Radio size="small" />} label="Подписанные" />
        </RadioGroup>
      </FormControl>
      <SearchForm sx={{ marginLeft: 'auto', marginRight: 2 }} />
    </Toolbar>
  );
};

export default DocumentsTableToolbar;
