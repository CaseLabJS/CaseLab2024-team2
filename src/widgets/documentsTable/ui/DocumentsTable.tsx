import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { documentsStore } from '@/entities/documents';
import { documentTypesStore } from '@/entities/documentsType';
import { useToast } from '@/shared/hooks';
import { Status } from '@/shared/types/status.type';
import { getStatusTranslation } from '@/shared/utils/statusTranslation';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography } from '@mui/material';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useCallback, type ReactElement } from 'react';
import { useNavigate } from 'react-router';

const DocumentsTable = observer(({ debounceValue }: { debounceValue: string }): ReactElement => {
  const navigate = useNavigate();

  const { showToast } = useToast();
  const stableShowToast = useCallback(showToast, [showToast]);
  useEffect(() => {
    documentsStore.setQuery(debounceValue);
  }, [debounceValue]);

  const handleChangePage = (event: unknown, newPage: number): void => {
    documentsStore.setPage(newPage);
  };

  useEffect(() => {
    const disposer = reaction(
      () => documentsStore.status,
      (status) => {
        if (status === Status.ERROR) {
          void stableShowToast('error', 'Ошибка загрузки документов');
        }
      },
    );

    return (): void => disposer();
  }, [stableShowToast]);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    documentsStore.setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleClickDocument = (id: number): void => {
    navigate(`${ROUTE_CONSTANTS.USER_DOCUMENTS.path}/${id}`);
  };

  const typeDocument = documentTypesStore.documentTypes;

  if (documentsStore.documents.length < 1)
    return <Typography>Список документов пуст. Создайте новый документ</Typography>;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Тип</TableCell>
            <TableCell>Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documentsStore.documents.map(({ document }, index) => (
            <TableRow key={index} onClick={() => handleClickDocument(document.id)} sx={{ cursor: 'pointer' }}>
              <TableCell>{document.name}</TableCell>
              <TableCell>{typeDocument.find((type) => type.id === document.document_type_id)?.name}</TableCell>
              <TableCell>{getStatusTranslation(document.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={documentsStore.count}
        rowsPerPage={documentsStore.rowsPerPage}
        page={documentsStore.pageNumber}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={'Строк на странице:'}
      />
    </>
  );
});

export default DocumentsTable;
