import type { CombinedAttribute } from '@/entities/attribute';
import type { DocumentTypeToAttributeRequest } from '@/entities/documentsType';
import type { ReactElement } from 'react';

import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function AttributesTable({
  attributes,
  setAttributes,
}: {
  attributes: CombinedAttribute[];
  setAttributes: React.Dispatch<React.SetStateAction<DocumentTypeToAttributeRequest[]>>;
}): ReactElement {
  const handleCheckboxChange = (attributeId: number): void => {
    setAttributes((prevAttributes) =>
      prevAttributes.map((attribute) =>
        attribute.attribute_id === attributeId ? { ...attribute, is_optional: !attribute.is_optional } : attribute,
      ),
    );
  };
  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell align="center">Обязательный</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attributes.map((row) => (
              <TableRow key={row.attribute_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    sx={{ margin: 0, padding: 0 }}
                    checked={!row.is_optional}
                    onChange={() => handleCheckboxChange(row.attribute_id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AttributesTable;
