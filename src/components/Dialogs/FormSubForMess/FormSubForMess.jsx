import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { maxLengthCreator } from "../../../utils/validators";
import '../../Common/StyleValidation/textareaError.css'

const FormSubForMess = (props) => {
  return (
    <Formik
      initialValues={{ message: "" }}
      validate={maxLengthCreator(15, "message")}
      onSubmit={(values, { resetForm }) => {
        props.onSendMessageClick(values.message);
        resetForm();
      }}
    >
      {({ dirty, isValid }) => (
        <Form>
          <Field
            className={!isValid ? 'errorRed' : ''}
            as="textarea"
            name="message"
            placeholder="Enter your message"
          />
          <ErrorMessage name="message" component="div" />
          <button type="submit" disabled={!dirty || !isValid}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormSubForMess;
