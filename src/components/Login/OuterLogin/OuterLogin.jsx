import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./OuterLogin.css";
import { loginValidator } from "../../../utils/validators";
import "../../Common/StyleValidation/inputError.css";
import { useNavigate } from "react-router-dom";

const OuterLogin = ({ login, isAuth }) => {
  const navigate = useNavigate();

  const createField = (type, name) => {
    return <Field type={type} name={name} />;
  };
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: "" }}
        validate={loginValidator}
        onSubmit={(values, { setSubmitting }) => {
          login(values.email, values.password, values.rememberMe);
          if (isAuth) {
            return navigate("/profile");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid, errors }) => (
          <Form className="loginForm">
            {createField("email", "email")}
            <ErrorMessage name="email" component="div" />
            {createField("password", "password")}
            <ErrorMessage name="password" component="div" />
            <label className="label">
              {createField("checkbox", "rememberMe")}
              <div>Remember me</div>
            </label>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OuterLogin;
