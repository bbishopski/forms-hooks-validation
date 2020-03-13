import React, { useState } from "react";
import { login } from "./utils/login";
import PropTypes from "prop-types";
import "./styles.css";
import useFormValidation from "./useFormValidation";
import validateAuth from "./validateAuth";

const INITIAL_STATE = {
  email: "",
  password: ""
};

/** our own custom HOOK (useFormValidation), no reducer, etc...very lightweight */
function LoginFormValidation() {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateAuth, authenticateUser);
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  const [aapLoginError, setAapLoginError] = useState(null);

  /** Move the authentication out of the validator */
  async function authenticateUser() {
    //const { email, password } = values;
    try {
      await login({ username: values.email, password: values.password });
      setAapLoginError(null);
    } catch (error) {
      setAapLoginError(error);
    }
  }

  return (
    <div className="container">
      <h1>Register Here</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          value={values.email}
          className={errors.email && "error-input"}
          autoComplete="off"
          placeholder="Your email address"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && "error-input"}
          name="password"
          type="password"
          placeholder="Choose a safe password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {aapLoginError && <p className="error-text">{aapLoginError}</p>}
        <div>
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

LoginFormValidation.propTypes = {};

export default LoginFormValidation;
