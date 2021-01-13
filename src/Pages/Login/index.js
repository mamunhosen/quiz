import React from "react";
import { Redirect } from "react-router-dom";

import { useForm } from "../../Utils/react-utils";
import { loginUser, useAuthState, useAuthDispatch } from "../../Context";

import "./login.css";

const Login = (props) => {
  const dispatch = useAuthDispatch();
  const { loading, errorMessage, user: currentUser } = useAuthState();

  const validateLoginForm = (values) => {
    const errors = {};
    if (values.email === "") {
      errors.email = "Email must not be empty";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (values.password === "") {
      errors.password = "Password must not be empty";
    }

    return errors;
  };

  const doSubmit = async (user) => {
    try {
      const response = await loginUser(dispatch, {
        email: user.email,
        password: user.password,
      });
      if (!response) return;
      if (response.isAdmin) {
        props.history.push("/questions");
      } else {
        props.history.push("/answers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { onChange, onSubmit, values, errors } = useForm(
    {
      email: "",
      password: "",
    },
    doSubmit,
    validateLoginForm
  );

  if (currentUser) {
    return currentUser.isAdmin ? (
      <Redirect to={{ pathname: "/questions" }} />
    ) : (
      <Redirect to={{ pathname: "/answers" }} />
    );
  }
  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={onSubmit} noValidate>
        <h2 className="login__headline">Login</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="input-field"
            id="email"
            name="email"
            onChange={onChange}
            value={values.email}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="input-field"
            id="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <input
          type="submit"
          value="Login"
          className="btn-submit"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Login;
