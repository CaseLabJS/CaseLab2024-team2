import { DocumentTypeResponse } from "@/entities/Document";
import { Button, Card, CardActionArea, CardActions, CardContent, Grid2, Typography } from "@mui/material";
import { ReactElement } from "react";

interface DocumentTypeProps {
    documentType: DocumentTypeResponse;
}

const DocumentType = ({ documentType }: DocumentTypeProps): ReactElement => {
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
            <Button variant="contained">
                Заполнить
            </Button>
            <Button color="error">
                Удалить
            </Button>
        </CardActions>
    </Card>
}

export default DocumentType;