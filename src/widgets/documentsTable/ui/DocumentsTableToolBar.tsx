import { documentsStore } from '@/entities/documents';
import { SearchForm } from '@/shared/components';
import { useDebounce } from '@/shared/hooks';
import { CreateDocumentDialog } from '@/widgets/createDocumentDialog';
import { Add } from '@mui/icons-material';
import {
  Toolbar,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TableContainer,
  Paper,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement } from 'react';

import DocumentsTable from './DocumentsTable';

const DocumentsTableToolbar = observer((): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCreateDocumentDialogOpen, setCreateDocumentDialogState] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    void documentsStore.setIsShowSignedOnly(false).catch();
    setSearchTerm(e.target.value);
  };

  const debounceValue = useDebounce(searchTerm, 400);

  return (
    <TableContainer component={Paper} sx={{ marginTop: '30px', padding: 4 }}>
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
        <FormControl
          size="small"
          sx={{
            margin: '0 auto',
          }}
        >
          <RadioGroup
            row
            value={documentsStore.isShowSignedOnly}
            onChange={(e) => {
              const isValue = e.target.value === 'true';
              setSearchTerm('');
              void documentsStore.setIsShowSignedOnly(isValue);
            }}
          >
            <FormControlLabel value={false} control={<Radio size="small" />} label="Все" />
            <FormControlLabel value={true} control={<Radio size="small" />} label="Подписанные" />
          </RadioGroup>
        </FormControl>
        <SearchForm sx={{ marginLeft: 'auto', marginRight: 2 }} value={searchTerm} onChange={handleChange} />
      </Toolbar>
      <DocumentsTable debounceValue={debounceValue} />
    </TableContainer>
  );
});

export default DocumentsTableToolbar;
