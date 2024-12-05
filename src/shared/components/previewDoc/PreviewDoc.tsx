import type { ReactElement } from 'react';

import { documentsStore } from '@/entities/documents';
import { Box } from '@mui/material';
import { Viewer } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';

const PreviewDoc = (): ReactElement => {
  const file = documentsStore.currentFileUrl;
  const format = documentsStore.currentDocument?.latest_version.contentName.split('.').pop();
  const title = documentsStore.currentDocument?.latest_version.name;

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
        {file !== '' && format === 'xlsx' && <iframe src={file} width="100%" height="600px"></iframe>}
      </>
    </Box>
  );
};

export default PreviewDoc;
