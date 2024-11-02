import type { ReactElement } from 'react';

import { useState } from 'react';
import DocumentMetaModelPicker from '@/pages/DocumentMetaModels/ui/DocumentMetaModelPicker.tsx';
import DocumentFiller from '@/pages/DocumentMetaModels/ui/DocumentFiller.tsx';
import { DocumentTypeResponse } from '@/entities/Document';


const DocumentMetaModels = (): ReactElement => {
  const [ documentType, setDocumentType ] = useState<DocumentTypeResponse | undefined>();

  console.log(documentType);

  return <div>
    Выберите документ для заполнения
    <DocumentMetaModelPicker  setDocumentType={setDocumentType}/>
    <DocumentFiller documentType={documentType} />
  </div>
}

export default DocumentMetaModels;
