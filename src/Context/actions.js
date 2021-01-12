import {
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from "./actionTypes";
import users from "../Users";

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: REQUEST_LOGIN });
    const user = users.find(
      (user) =>
        user.email === loginPayload.email &&
        user.password === loginPayload.password
    );
    if (user) {
      delete user.password;
      dispatch({ type: LOGIN_SUCCESS, payload: user });
      localStorage.setItem("currentUser", JSON.stringify(user));
      return user;
    }
    dispatch({ type: LOGIN_ERROR, error: "Invalid Username/Password" });
    return;
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      error: "Something went wrong!! Please try again later",
    });
  }
}

export async function logout(dispatch) {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("currentUser");
}
