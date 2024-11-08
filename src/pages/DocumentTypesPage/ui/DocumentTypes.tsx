import { useRootStore } from "@/app/providers/store";
import { Grid2, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

import DocumentType from "./DocumentType";

const DocumentTypes = observer(() => {
    const { documentTypesStore } = useRootStore();

    if (documentTypesStore.documentTypes.length === 0) {
        return <Typography>
            Загрузка...
        </Typography>
    }

    return <Grid2 container spacing={2}>
        {
            documentTypesStore.documentTypes.map(documentType => {
                return <DocumentType key={documentType.name} {...{documentType}} />
            })
        }
    </Grid2>;
})

export default DocumentTypes;