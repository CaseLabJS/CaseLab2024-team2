import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { documentsStore } from '@/entities/documents';
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
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router';

import DocumentsTableToolbar from './DocumentsTableToolBar';

const DocumentsTable = observer((): ReactElement => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isShowSignedOnly, setIsShowSignedOnly] = useState<boolean>(false);

  useEffect(() => {
    void documentsStore.getDocumentsPage();
  }, []);
  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDocuments = useMemo(() => {
    if (isShowSignedOnly) {
      return documentsStore.documents.filter(({ document }) => document.status === DocumentStatus.SIGNATURE_ACCEPTED);
    }
    return documentsStore.documents;
  }, [isShowSignedOnly, documentsStore.documents]);

  const displayedData = filteredDocuments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleClickDocument = (id: number): void => {
    navigate(`${ROUTE_CONSTANTS.USER_DOCUMENTS.path}/${id}`);
  };

  return (
    <TableContainer component={Paper} sx={{ padding: 4 }}>
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
              <TableCell>{document.document_type_id}</TableCell>
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
  );
});

export default DocumentsTable;
