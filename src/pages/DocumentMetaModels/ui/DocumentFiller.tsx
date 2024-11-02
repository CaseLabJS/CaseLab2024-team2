import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { DocumentTypeResponse } from '@/entities/Document';
import { AttributeResponse } from '@/entities/Attribute';
import { getAttributeDoc } from '@/api/req-doc-attributes.ts';
import { Button, TextField } from '@mui/material';
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface DocumentFillerProps {
  documentType: DocumentTypeResponse | undefined;
}

const DocumentFiller = (props: DocumentFillerProps): ReactElement => {
  const [ fields, setFields ] = useState<AttributeResponse[]>([]);
  const [ fileName, setFileName ] = useState("");

  useEffect(() => {
    if (!props.documentType) {
      setFields([])
      return;
    }

    Promise.all(props.documentType.attributes.map(attribute => getAttributeDoc(attribute.attribute_id)))
      .then(setFields)
      .catch(console.log);
  }, [ props.documentType ]);

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    setFileName(file.name);
  }

  function handleSubmit(): void {
    // some actions
  }

  if (!props.documentType) {
    return <></>;
  }

  console.log(props.documentType, fields, props.documentType.attributes)

  if (props.documentType.attributes.length != fields.length) {
    return <>Загрузка атрибутов</>;
  }

  return <form style={{display:"flex", flexDirection: "column"}}>
    {
      props.documentType.attributes.map((attribute, index) => {
        return <TextField
          required={!attribute.is_optional}
          key={attribute.attribute_id}
          label={fields.at(index)!.name}
          placeholder={fields.at(index)!.type}
        />
      })
    }
    <Button
      component="label"
      variant="outlined"
      startIcon={<UploadFileIcon />}
      sx={{ marginRight: "1rem" }}
    >
      { fileName || "Загрузите файл" }
      <input type="file" hidden onChange={handleFileUpload} />
    </Button>
    <Button onClick={handleSubmit} variant="outlined">
      Сохранить
    </Button>
  </form>
}

export default DocumentFiller;
