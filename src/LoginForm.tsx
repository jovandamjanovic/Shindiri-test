import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Input, Button, Row, Container, Alert } from "reactstrap";
import { useHistory } from "react-router-dom";
import { login } from './api';

const LoginForm = () => {
  const history = useHistory();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: yup.object()
      .shape({
        username: yup.string().required('Username cannot be empty.'),
        password: yup.string().required('Password cannot be empty.')
      }),
    onSubmit: (values, { setErrors }) => {
      login(values.username, values.password).then(() => {
        history.push('/dashboard');
      }).catch(e => {
        setErrors({ password: e.message })
      });
    }
  })

  return (
    <Container className="loginForm">
      <Row className="justify-content-center" md="4" sm="6" xs="10">
        <Form className="p-1" onSubmit={handleSubmit}>
          <Input
            className="m-2"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          {touched.username && errors.username && <Alert color="danger">{errors.username}</Alert>}
          <Input
            className="m-2"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password && <Alert color="danger">{errors.password}</Alert>}
          <Button className="m-2" type="submit">Sign in</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default LoginForm;
