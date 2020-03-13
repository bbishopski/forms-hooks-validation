import React, { useState, useReducer } from "react";
import { Form, Button } from "react-bootstrap";
import { login } from "./utils/login";
import PropTypes from "prop-types";

/**  pull state management into a reducer, could even move to separate file....or not */
function loginReducer(state, action) {
  switch (action.type) {
    case "FORM_INVALID": {
      return {
        ...state,
        error: "Invalid form",
        isValidated: false
      };
    }

    case "field": {
      return {
        ...state,
        [action.field]: action.value
      };
    }
    case "LOGGING_IN": {
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    }
    case "LOGIN_SUCCESFUL": {
      return {
        ...state,
        isLoggedIn: true
      };
    }
    case "LOGIN_ERROR": {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        username: "",
        password: ""
      };
    }

    default:
      break;
  }
  return state;
}

const initialState = {
  isLoading: false,
  username: "",
  password: "",
  error: "",
  isLoggedIn: false,
  isValidated: true
};

const LoginFormReducerValidator = props => {
  // Instead of useState, manage all state inside the reducer
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const { isLoading, username, password, error, isValidated } = state;

  const handleSubmit = async event => {
    debugger;
    event.preventDefault();

    // let html validation take place
    if (event.currentTarget.checkValidity() === false) {
      dispatch({ type: "FORM_INVALID" });
      return;
    }

    // field validation
    if (username !== "b@b.com") {
      dispatch({ type: "FORM_INVALID" });
    }

    dispatch({ type: "LOGGING_IN" });
    try {
      await login({ username, password });
      dispatch({ type: "LOGIN_SUCCESFUL" });
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: "Incorrect username or password"
      });
    }
  };

  return (
    <>
      <h5 className="mt-5">LoginFormReducerValidator</h5>
      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
        {!isValidated && <p className="error">Form Validation Error</p>}
        {error && <p className="error">{error}</p>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email" //"email"
            placeholder="Enter email"
            required
            onChange={e =>
              dispatch({
                type: "field",
                field: "username",
                value: e.currentTarget.value
              })
            }
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
            onChange={e =>
              dispatch({
                type: "field",
                field: "password",
                value: e.currentTarget.value
              })
            }
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

LoginFormReducerValidator.propTypes = {};

export default LoginFormReducerValidator;
