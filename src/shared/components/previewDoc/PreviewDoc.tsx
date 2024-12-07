import { documentsStore } from '@/entities/documents';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Viewer } from '@react-pdf-viewer/core';
import { observer } from 'mobx-react-lite';

import '@react-pdf-viewer/core/lib/styles/index.css';

import { useEffect, useState, type ReactElement } from 'react';
import * as XLSX from 'xlsx';

interface ExcelData {
  [key: string]: string | number | boolean | null;
}

const formatListImg = ['jpeg', 'png', 'jpg', 'jpe', 'jif', 'jfif', 'jfi', 'apng', 'gif', 'webp', 'avif'];

const PreviewDoc = observer(({ blob }: { blob: Blob }): ReactElement => {
  const [data, setData] = useState<ExcelData[]>([]);
  const [url, setUrl] = useState('');
  const [textFile, setTextFile] = useState<string>('');
  const [fileFormat, setFileFormat] = useState<string>('');
  const title = documentsStore.currentDocument?.document.name;
  const text = 'Формат документа не поддерживается предварительным просмотром';

  const processExcelBlob = (blob: Blob): void => {
    const reader = new FileReader();

    reader.onload = (e): void => {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer instanceof ArrayBuffer) {
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json<ExcelData>(worksheet);
        setData(jsonData);
      }
    };

    reader.readAsArrayBuffer(blob);
  };

  const processTextBlob = (blob: Blob): void => {
    const reader = new FileReader();
    reader.onload = (e): void => {
      if (e.target?.result) {
        setTextFile(e.target.result as string);
      }
    };
    reader.readAsText(blob);
  };

  useEffect(() => {
    const fetchAndProcessBlob = (blob: Blob): void => {
      try {
        const format = documentsStore.currentDocument?.latest_version.contentName?.split('.').pop();
        if (format === 'xlsx' || format === 'xls') {
          setFileFormat('xlsx');
          processExcelBlob(blob);
        } else if (format !== undefined && formatListImg.includes(format)) {
          setFileFormat('img');
          setUrl(URL.createObjectURL(blob));
          URL.revokeObjectURL(url);
        } else if (format === 'txt') {
          setFileFormat('txt');
          processTextBlob(blob);
        } else if (format === 'pdf') {
          setFileFormat('pdf');
          setUrl(URL.createObjectURL(blob));
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndProcessBlob(blob);
  }, []);

  return (
    <Box padding="20px" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <>
        {
          <>
            {fileFormat === 'txt' && <div>{textFile}</div>}
            {fileFormat === 'img' && <img alt={title} src={url} />}
            {fileFormat === 'pdf' && <Viewer fileUrl={url}></Viewer>}
            {fileFormat === 'xlsx' && data.length !== 0 && (
              <TableContainer component={Paper} sx={{ maxHeight: '600px', overflow: 'auto' }}>
                <Table aria-label={title}>
                  <TableHead>
                    <TableRow>
                      {Object.keys(data[0]).map((key) => (
                        <TableCell key={key} size="small">
                          {key}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, i) => (
                          <TableCell key={i} size="small">
                            {String(value)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {fileFormat === 'xlsx' && !data.length && <div>No data</div>}
            {fileFormat === '' && <div>{text}</div>}
          </>
        }
      </>
    </Box>
  );
});

export default PreviewDoc;
