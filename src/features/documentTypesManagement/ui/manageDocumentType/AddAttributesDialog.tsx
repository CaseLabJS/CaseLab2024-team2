import type { DocumentTypeToAttributeRequest } from '@/entities/documents';
import type { DialogProps } from '@mui/material';

import { attributesStore } from '@/entities/attribute/model/attributeStore';
import { TransferList } from '@/shared/components';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, IconButton, DialogContent, DialogActions, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const AddAttributesDialog = observer(
  ({
    open,
    handleClose,
    onAdd,
    usedAttributes,
  }: {
    open: DialogProps['open'];
    handleClose: () => void;
    onAdd: (newAttributes: DocumentTypeToAttributeRequest[]) => void;
    usedAttributes: DocumentTypeToAttributeRequest[];
  }): React.ReactElement => {
    const [leftData, setLeftData] = useState<DocumentTypeToAttributeRequest[]>([]);
    const [rightData, setRightData] = useState<DocumentTypeToAttributeRequest[]>([]);

    const handleTransfer = (
      newLeftData: DocumentTypeToAttributeRequest[],
      newRightData: DocumentTypeToAttributeRequest[],
    ): void => {
      setLeftData(newLeftData);
      setRightData(newRightData);
    };

    useEffect(() => {
      if (open) {
        let allAttributes = attributesStore.attributes.map((a) => ({
          attribute_id: a.id,
          name: a.name,
          is_optional: true,
        }));
        allAttributes = allAttributes.filter((a) => {
          if (usedAttributes.find((a1) => a1.attribute_id == a.attribute_id)) return false;
          return true;
        });
        const used = usedAttributes.map((a) => {
          const c = attributesStore.getById(a.attribute_id);
          return { ...a, name: c?.name };
        });
        setLeftData(allAttributes);
        setRightData(used);
      }
    }, [open, usedAttributes]);

    return (
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Выберите атрибуты</DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TransferList
            onTransfer={handleTransfer}
            renderListItem={(a) => {
              const attributeWithName = {
                ...a,
                ...attributesStore.getById(a.attribute_id),
              };
              return <span>{attributeWithName.name}</span>;
            }}
            leftData={leftData}
            rightData={rightData}
          ></TransferList>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onAdd(rightData);
              handleClose();
            }}
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

export default AddAttributesDialog;
