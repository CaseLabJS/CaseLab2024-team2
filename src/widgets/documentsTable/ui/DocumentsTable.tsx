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
import { useState, type ReactElement } from 'react';

import type DocumentsTableProps from '../model/DocumentsTableProps';

import DocumentsTableToolbar from './DocumentsTableToolBar';

const DocumentsTable = ({ data }: DocumentsTableProps): ReactElement => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const displayedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper} sx={{ padding: 4 }}>
      <DocumentsTableToolbar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Header</TableCell>
            <TableCell>Header</TableCell>
            <TableCell>Header</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.column1}</TableCell>
              <TableCell>{row.column2}</TableCell>
              <TableCell>{row.column3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={'Строк на странице:'}
      />
    </TableContainer>
  );
};

export default DocumentsTable;
