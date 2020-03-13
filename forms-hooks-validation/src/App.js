import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginFormPlain from "./LoginFormPlain";
import LoginFormReducer from "./LoginFormReducer";
import LoginFormReducerValidator from "./LoginFormReducerValidator";
import Layout from "./Layout";
import LoginFormValidation from "./LoginFormValidation";

function App() {
  return (
    <Layout>
      <LoginFormPlain></LoginFormPlain>
      <LoginFormReducer></LoginFormReducer>
      <LoginFormReducerValidator></LoginFormReducerValidator>
      <LoginFormValidation></LoginFormValidation>
    </Layout>
  );
}

export default App;
