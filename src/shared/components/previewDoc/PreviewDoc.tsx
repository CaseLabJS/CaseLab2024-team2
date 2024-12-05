import { documentsStore } from '@/entities/documents';
import { Box } from '@mui/material';
import { Viewer } from '@react-pdf-viewer/core';
import { useEffect, useState, type ReactElement } from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import * as XLSX from 'xlsx';

interface ExcelData {
  [key: string]: string | number | boolean | null; // Потенциальные типы значений
}

const PreviewDoc = (): ReactElement => {
  const [data, setData] = useState<ExcelData[]>([]);
  const file = documentsStore.currentFileUrl;
  const format = documentsStore.currentDocument?.latest_version.contentName.split('.').pop();
  const title = documentsStore.currentDocument?.latest_version.name;

  const processExcelBlob = (blob: Blob): void => {
    const reader = new FileReader();

    reader.onload = (e): void => {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer instanceof ArrayBuffer) {
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        console.log(worksheet);
        const jsonData = XLSX.utils.sheet_to_json<ExcelData>(worksheet, { header: 1 });
        console.log(jsonData);
        setData(jsonData);
      }
    };

    reader.readAsArrayBuffer(blob);
  };

  useEffect(() => {
    if (format === 'xlsx' || format === 'xls') {
      documentsStore
        .fetchDocumentBlob()
        .then((blob) => processExcelBlob(blob))
        .catch(console.error);
    }
  }, [format]);

  return (
    <Box padding="20px" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <>
        {file !== '' &&
          (format === 'jpeg' ||
            format === 'png' ||
            format === 'jpg' ||
            format === 'jpe' ||
            format === 'jif' ||
            format === 'jfif' ||
            format === 'jfi' ||
            format === 'apng' ||
            format === 'gif' ||
            format === 'webp' ||
            format === 'avif') && <img alt={title} src={file} />}
        {file !== '' && format === 'pdf' && <Viewer fileUrl={file}></Viewer>}
        {data && data.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    </Box>
  );
};

export default PreviewDoc;
