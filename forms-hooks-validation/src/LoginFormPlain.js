import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { login } from "./utils/login";
import PropTypes from "prop-types";

/** useState for all form fields, use built in HTML 5 validation on the form, no custom validation */
const LoginFormPlain = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async event => {
    debugger;
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    // Form validation only, rely on HTML 5
    if (form.checkValidity() === false) {
      setValidated(false);
      return;
    }
    setValidated(true);
    setIsLoading(true);
    try {
      await login({ username, password });
    } catch (error) {
      setError("Incorrect username or password");
    }

    setIsLoading(false);
  };

  return (
    <>
      <h5 className="mt-5">LoginFormPlain</h5>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {!validated && <p className="error">Form Validation Error</p>}
        {error && <p className="error">{error}</p>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email" //"email"
            placeholder="Enter email"
            required
            onChange={e => setUsername(e.currentTarget.value)}
            value={username}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={e => setPassword(e.currentTarget.value)}
            value={password}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Submit"}
        </Button>
      </Form>
    </>
  );
};

LoginFormPlain.propTypes = {};

export default LoginFormPlain;
