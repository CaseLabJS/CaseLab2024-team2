import type { AttributeResponse, StatefulAttribute } from '@/entities/attribute';

import { attributesStore } from '@/entities/attribute';
import { useToast } from '@/shared/hooks';
import { Status } from '@/shared/types/status.type';
import { ConfirmationDialog } from '@/widgets/confirmationDialog/';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement, useMemo, useEffect, useCallback } from 'react';

import EditAttributeDialog from './EditAttributeDialog';

import style from './attributeTable.module.css';

const AttributeTable = observer(({ debounceValue }: { debounceValue: string }): ReactElement => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [currentAttribute, setCurrentAttribute] = useState<StatefulAttribute | null>(null);

  const [isEditAttributeDialogOpen, setIsEditAttributeDialogOpen] = useState(false);
  const [attributeIdToDelete, setAttributeIdToDelete] = useState(0);
  const openEditAttributeDialog = (): void => setIsEditAttributeDialogOpen(true);
  const closeEditAttributeDialog = (): void => setIsEditAttributeDialogOpen(false);

  const { showToast } = useToast();
  const stableShowToast = useCallback(showToast, [showToast]);

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    void attributesStore.load(true).then(() => setRowsPerPage(5));
  }, []);

  useEffect(() => {
    const disposer = reaction(
      () => attributesStore.status,
      (status) => {
        if (status === Status.ERROR) {
          void stableShowToast('error', 'Ошибка загрузки атрибутов');
        }
      },
    );

    return (): void => disposer();
  }, [stableShowToast]);

  const { filtered, count } = useMemo(() => {
    const init = debounceValue
      ? attributesStore.attributes.filter((item: AttributeResponse) =>
          item.name.toLowerCase().includes(debounceValue.toLowerCase()),
        )
      : attributesStore.attributes;
    return {
      filtered: init.slice(rowsPerPage * page, page * rowsPerPage + rowsPerPage),
      count: init.length,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, page, rowsPerPage, attributesStore.attributes.length]);

  if (!filtered) {
    return <Typography>Нет атрибутов</Typography>;
  }

  const handleRemoveAttribute = async (id: number): Promise<void> => {
    try {
      await attributesStore.deleteById(id);
    } catch {
      showToast('error', 'Ошибка удаления атрибута');
    }
  };

  return (
    <>
      <ConfirmationDialog
        open={attributeIdToDelete !== 0}
        onClose={() => setAttributeIdToDelete(0)}
        onSubmit={() => handleRemoveAttribute(attributeIdToDelete)}
        children={<Typography>Вы действительно собираетесь удалить атрибут?</Typography>}
      />
      <TableContainer component="div" className={style.table}>
        <Table size="small" aria-label="users table">
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '46%' }} />
            <col style={{ width: '46%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Тип</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left">
                  <EditIcon
                    className={style.editIcon}
                    onClick={() => {
                      setCurrentAttribute(item);
                      openEditAttributeDialog();
                    }}
                  />
                  <DeleteIcon className={style.deleteIcon} onClick={() => setAttributeIdToDelete(item.id)} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15, 20]}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          slotProps={{
            actions: {
              nextButton: {
                disabled: count <= page * rowsPerPage + rowsPerPage,
              },
            },
          }}
        />
      </TableContainer>
      {currentAttribute && (
        <EditAttributeDialog
          open={isEditAttributeDialogOpen}
          handleClose={closeEditAttributeDialog}
          attribute={currentAttribute}
        />
      )}
    </>
  );
});

export default AttributeTable;
