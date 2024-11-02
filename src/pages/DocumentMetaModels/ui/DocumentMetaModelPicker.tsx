import type { ReactElement } from 'react';
import type { DocumentTypeResponse } from '@/entities/Document';

import { useState, useEffect } from 'react';

import { getAllDocTypes } from '@/api/req-doc-types.ts';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface DocumentMetaModelPickerProps {
  setDocumentType: (type: DocumentTypeResponse | undefined) => void;
}

const DocumentMetaModelPicker = ({ setDocumentType }: DocumentMetaModelPickerProps): ReactElement => {
  const [ documentMetaModels, setDocumentMetaModels ] = useState<DocumentTypeResponse[]>([]);

  console.log(">>", setDocumentType);

  useEffect(() => {
    getAllDocTypes()
      .then(setDocumentMetaModels)
      .catch(console.log)
  }, [])

  return <div>
    <FormControl sx={{ m: 1, minWidth: 256 }}>
      <InputLabel id="document-type">Тип документа</InputLabel>
      <Select
        labelId="document-type-label"
        id="document-type"
        label="Документ"
        variant={"outlined"}
        onChange={event => setDocumentType(documentMetaModels.find(doc => doc.id == event.target.value as number))}
      >
        <MenuItem value=""><em>Не выбран</em></MenuItem>
        {
          documentMetaModels.map(document => {
            return <MenuItem
              key={document.id}
              value={document.id}
            >
              {document.name}
            </MenuItem>
          })
        }
      </Select>
    </FormControl>
  </div>
}

export default DocumentMetaModelPicker;
