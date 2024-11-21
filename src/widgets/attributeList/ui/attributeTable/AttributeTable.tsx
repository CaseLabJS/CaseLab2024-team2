import type { AttributeResponse, StatefulAttribute } from '@/entities/attribute';

import { attributesStore } from '@/entities/attribute';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableCell, TableHead, TableBody, TableRow, TableContainer } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import style from './attributeTable.module.css';

const AttributeTable = observer(({ debounceValue }: { debounceValue: string }) => {
  const [filteredAttributes, setFilteredAttributes] = useState<StatefulAttribute[]>();

  const handleRemoveAttribute = async (id: number): Promise<void> => {
    try {
      await attributesStore.deleteById(id);
    } catch {
      alert('Ошибка удаления');
    }
  };

  useEffect(() => {
    attributesStore
      .load()
      .then(() => {
        const filtered = debounceValue
          ? attributesStore.attributes.filter((item: AttributeResponse) =>
              item.name.toLowerCase().includes(debounceValue.toLowerCase()),
            )
          : attributesStore.attributes;
        setFilteredAttributes(filtered);
      })
      .catch(() => alert('Ошибка'));
  }, []);

  useEffect(() => {
    const filtered = debounceValue
      ? attributesStore.attributes.filter((item: AttributeResponse) =>
          item.name.toLowerCase().includes(debounceValue.toLowerCase()),
        )
      : attributesStore.attributes;
    setFilteredAttributes(filtered);
  }, [debounceValue]);

  return (
    <TableContainer component="div" className={style.table}>
      <Table size="small" aria-label="users table">
        <colgroup>
          <col style={{ width: '8%' }} />
          <col style={{ width: '46%' }} />
          <col style={{ width: '46%' }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Тип</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAttributes &&
            filteredAttributes.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left">
                  <DeleteIcon className={style.deleteIcon} onClick={() => handleRemoveAttribute(item.id)} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.type}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default AttributeTable;
