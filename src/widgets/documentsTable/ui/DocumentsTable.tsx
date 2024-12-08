import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { documentsStore } from '@/entities/documents';
import { documentTypesStore } from '@/entities/documentsType';
import { DocumentStatus, getStatusTranslation } from '@/shared/utils/statusTranslation';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router';

import DocumentsTableToolbar from './DocumentsTableToolBar';

const DocumentsTable = observer((): ReactElement => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isShowSignedOnly, setIsShowSignedOnly] = useState<boolean>(false);

  useEffect(() => {
    documentsStore.getDocumentsPage().catch((err) => console.log(err));
  }, []);
  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDocuments = isShowSignedOnly
    ? documentsStore.documents.filter(({ document }) => document.status === DocumentStatus.SIGNATURE_ACCEPTED)
    : documentsStore.documents;

  const displayedData = filteredDocuments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleClickDocument = (id: number): void => {
    navigate(`${ROUTE_CONSTANTS.USER_DOCUMENTS.path}/${id}`);
  };

  const typeDocument = documentTypesStore.documentTypes;

  return (
    <Box width="70%" margin="0 auto">
      <TableContainer component={Paper} sx={{ padding: 4, borderRadius: '10px' }}>
        <DocumentsTableToolbar
          isShowSignedOnly={isShowSignedOnly}
          setIsShowSignedOnly={setIsShowSignedOnly}
          setPage={setPage}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Тип</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map(({ document }, index) => (
              <TableRow key={index} onClick={() => handleClickDocument(document.id)} sx={{ cursor: 'pointer' }}>
                <TableCell>{typeDocument.find((type) => type.id === document.document_type_id)?.name}</TableCell>
                <TableCell>{document.name}</TableCell>
                <TableCell>{getStatusTranslation(document.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={documentsStore.documents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={'Строк на странице:'}
        />
      </TableContainer>
    </Box>
  );
});

export default DocumentsTable;
