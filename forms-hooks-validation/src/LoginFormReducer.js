import React, { useState, useReducer } from "react";
import { Form, Button } from "react-bootstrap";
import { login } from "./utils/login";
import PropTypes from "prop-types";

/**  pull state management into a reducer, could even move to separate file....or not */
function loginReducer(state, action) {
  switch (action.type) {
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
  isLoggedIn: false
};

const LoginFormReducer = props => {
  // Instead of useState, manage all state inside the reducer
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [validated, setValidated] = useState(true);

  const { isLoading, username, password, error } = state;

  const handleSubmit = async event => {
    event.preventDefault();

    // let html validation take place
    if (event.currentTarget.checkValidity() === false) {
      setValidated(false);
      return;
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
      <h5 className="mt-5">LoginFormReducer</h5>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {!validated && <p className="error">Form Validation Error</p>}
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

LoginFormReducer.propTypes = {};

export default LoginFormReducer;
