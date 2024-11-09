import type { ReactElement } from "react";

import { Formik, Field, Form } from "formik";

export const createUser = (): ReactElement => {
  const initialValues = {
    user: "",
    email: "",
    password: "",
  };



  const onSubmit = (values: unknown):void => {


    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Formik {...{initialValues, onSubmit}}>
      {
        () => (
          <Form className="baseForm" noValidate>
            <Field
              type="text"
              id="user"
              className="formField"
              name="user"
            />
            <Field
              type="email"
              id="email"
              className="email formField"
              name="email"
            />
            <Field
              type="password"
              id="password"
              className="password formField"
              name="password"
            />
          </Form>
        )
      }
    </Formik>
  )
}
