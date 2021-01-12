import React from "react";

import { useForm } from "../../Utils/react-utils";
import { loginUser, useAuthState, useAuthDispatch } from "../../Context";

const Login = (props) => {
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const validateLoginForm = (values) => {
    const errors = {};
    if (values.email === "") {
      errors.email = "Email must not be empty";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (values.password === "") {
      errors.password = "Password must not be empty";
    } else if (values.password && values.password.length < 6) {
      errors.password =
        "Password needs to be more than or equal to 6 character";
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
      props.history.push("/answers");
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

  return (
    <form className="login-wrapper" onSubmit={onSubmit} noValidate>
      <h2 className="login__headline">Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="input-group">
        <label htmlFor="email">Email</label>
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
        <label htmlFor="password">Password</label>
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
  );
};

export default Login;
