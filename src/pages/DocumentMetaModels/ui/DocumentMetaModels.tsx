import type { ReactElement } from 'react';

import { useState } from 'react';
import DocumentMetaModelPicker from '@/pages/DocumentMetaModels/ui/DocumentMetaModelPicker.tsx';


const DocumentMetaModels = (): ReactElement => {
  const [ documentType, setDocumentType ] = useState<string>("");

  console.log(documentType);

  return <div>
    Выберите документ для заполнения
    <DocumentMetaModelPicker  setDocumentType={setDocumentType}/>
  </div>
}

export default DocumentMetaModels;
