import { ReactElement, useState } from "react";
import { DocumentTypeProps } from "./DocumentType";
import { Box, Modal, Typography } from "@mui/material";

interface DocumentFormModalWindowProps extends DocumentTypeProps {
    handleClose: () => void;
    isOpen: boolean;
}

const DocumentFormModalWindow = ({ documentType, isOpen, handleClose }: DocumentFormModalWindowProps): ReactElement => {
    //const handleClose = () => setOpen(false);


    return <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {documentType.name}
          </Typography>
        </Box>
    </Modal>
}

export default DocumentFormModalWindow;