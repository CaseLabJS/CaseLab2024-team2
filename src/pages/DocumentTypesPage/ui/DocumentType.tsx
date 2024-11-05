import { DocumentTypeResponse } from "@/entities/Document";
import { Button, Card, CardActions, CardContent, Grid2, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import DocumentFormModalWindow from "./DocumentFormModalWindow";

export interface DocumentTypeProps {
    documentType: DocumentTypeResponse;
}

const DocumentType = ({ documentType }: DocumentTypeProps): ReactElement => {
    const [ isModalWindowOpen, setModalWindowOpen ] = useState(false);

    return <Card>
        <CardContent>
            <Typography variant="h6" sx={{fontWeight: 700}}>
                #{documentType.id}
            </Typography>
            <Typography variant="h6" >
                {documentType.name}
            </Typography>
        </CardContent>
        <CardActions>
            <Button variant="contained" onClick={() => setModalWindowOpen(true)}>
                Заполнить
            </Button>
            <Button color="error">
                Удалить
            </Button>
        </CardActions>
        <DocumentFormModalWindow {...{ documentType, isOpen: isModalWindowOpen, handleClose: () => setModalWindowOpen(false) }} />
    </Card>
}

export default DocumentType;