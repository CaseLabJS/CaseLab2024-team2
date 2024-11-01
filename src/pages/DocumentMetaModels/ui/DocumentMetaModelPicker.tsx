import type { ReactElement } from 'react';
import type { DocumentTypeResponse } from '@/entities/Document';

import { useState, useEffect } from 'react';

import { getAllDocTypes } from '@/api/req-doc-types.ts';

interface DocumentMetaModelPickerProps {
  setDocumentType: (type: string) => void;
}

const DocumentMetaModelPicker = ({ setDocumentType }: DocumentMetaModelPickerProps): ReactElement => {
  const [ documentMetaModels, setDocumentMetaModels ] = useState<DocumentTypeResponse[]>([]);

  console.log(">>", setDocumentType);

  useEffect(() => {
    getAllDocTypes()
      .then(setDocumentMetaModels)
      .catch(console.log)
  }, [])

  return <select onChange={event => setDocumentType(event.target.value)}>
    <option value={''}>Документ не выбран</option>
    {
      documentMetaModels.map(document => {
        return <option
          key={document.id}
          value={document.id}
        >
          {document.name}
        </option>
      })
    }
  </select>
}

export default DocumentMetaModelPicker;
