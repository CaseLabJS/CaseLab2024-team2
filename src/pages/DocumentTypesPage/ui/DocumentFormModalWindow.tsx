import { ReactElement } from "react";
import { DocumentTypeProps } from "./DocumentType";
import { Box, Button, Container, Modal, TextField, Typography } from "@mui/material";
import { useRootStore } from "@/app/providers/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { Form, Formik } from "formik";

interface DocumentFormModalWindowProps extends DocumentTypeProps {
    handleClose: () => void;
    isOpen: boolean;
}

const DocumentFormModalWindow = observer(({ documentType, isOpen, handleClose }: DocumentFormModalWindowProps): ReactElement => {
    const { attributesStore } = useRootStore();

    if (attributesStore.attributes.length === 0) {
      return <Typography>Загрузка...</Typography>
    }

    const attributes = attributesStore.getCombinedDocumentAttributes(documentType);
    const initialValues = Object.fromEntries(
      attributes.map(attribute => {
        return [ attribute.name, "" ]
      })
    )
    const validationSchema = Yup.object(
      Object.fromEntries(
        attributes.map(attribute => {
          return [ 
            attribute.name, Yup.string().test(
              `${attribute.name}-validation`,
              `Поле обязательно для заполнения`,
              value => {
                console.log(attribute.is_optional, value)
                return attribute.is_optional || Boolean(value)
              }
            ) 
          ]
        })
      )
    )

    return <Modal
        open={isOpen}
        onClose={handleClose}
        sx={{ margin: "128px" }}
      >
        <Container sx={{ 
            backgroundColor: "white", 
            p: "25px", 
            borderRadius: 
            "16px", 
            width: "512px",
          }}>
          <Typography variant="h6" component="h2" sx={{color: "black"}}>
            Заполнение документа {documentType.name}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={console.log}
          >
            {({ errors, touched, getFieldProps }) => (
                <Form>
                {
                  attributes.map((attribute, index) => {
                    return <TextField
                      sx={{ mt: 2 }}
                      key={`${index}${attribute.attribute_id}`}
                      fullWidth
                      {...getFieldProps(attribute.name)}
                      label={
                        attribute.name[0].toLocaleUpperCase() + 
                        attribute.name.substring(1) + 
                        (attribute.is_optional ? "*" : "")
                      }
                      name={attribute.name}
                      error={touched[attribute.name] && Boolean(errors[attribute.name])}
                      helperText={touched[attribute.name] && errors[attribute.name]}
                    />
                  })
                }
                <Box sx={{ mt: 2 }}>
                  <Button color="primary" variant="contained" type="submit">
                    Сохранить
                  </Button>
                  <Button color="error" onClick={handleClose}>
                    Отменить
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
    </Modal>
})

export default DocumentFormModalWindow;