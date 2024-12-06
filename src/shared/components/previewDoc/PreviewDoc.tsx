import { documentsStore } from '@/entities/documents';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Viewer } from '@react-pdf-viewer/core';
import { useEffect, useState, type ReactElement } from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import * as XLSX from 'xlsx';

interface ExcelData {
  [key: string]: string | number | boolean | null;
}

const formatList = [
  'jpeg',
  'png',
  'jpg',
  'jpe',
  'jif',
  'jfif',
  'jfi',
  'apng',
  'gif',
  'webp',
  'avif',
  'xls',
  'xlsx',
  'pdf',
  'txt',
];

const formatListImg = ['jpeg', 'png', 'jpg', 'jpe', 'jif', 'jfif', 'jfi', 'apng', 'gif', 'webp', 'avif'];

const PreviewDoc = (): ReactElement => {
  const [data, setData] = useState<ExcelData[]>([]);
  const [url, setUrl] = useState('');
  const [textFile, setTextFile] = useState<string>('<a>куда-то</a>');
  const format = documentsStore.currentDocument?.latest_version.contentName.split('.').pop();
  const title = documentsStore.currentDocument?.latest_version.name;
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
    if (format !== undefined) {
      if (format === 'xlsx' || format === 'xls') {
        documentsStore
          .fetchDocumentBlob()
          .then((blob) => processExcelBlob(blob))
          .catch(console.error);
      }
      if (formatListImg.includes(format)) {
        documentsStore
          .fetchDocumentBlob()
          .then((blob) => setUrl(URL.createObjectURL(blob)))
          .catch(console.error);
      }
      if (format === 'txt') {
        documentsStore
          .fetchDocumentBlob()
          .then((blob) => processTextBlob(blob))
          .catch(console.error);
      }
    }
  }, [format]);

  return (
    <Box padding="20px" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <>
        {format !== undefined && (
          <>
            {format === 'txt' && textFile !== '' && <div>{textFile}</div>}
            {url !== '' && formatListImg.includes(format) && <img alt={title} src={url} />}
            {url !== '' && format === 'pdf' && <Viewer fileUrl={url}></Viewer>}
            {data && data.length > 0 && (format === 'xlsx' || format === 'xls') && (
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
            {!formatList.includes(format) && <div>{text}</div>}
          </>
        )}
      </>
    </Box>
  );
};

export default PreviewDoc;
