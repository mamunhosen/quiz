import {
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOAD_QUESTIONS_IN_PROGRESS,
  LOAD_QUESTIONS_IN_SUCCESS,
  LOAD_QUESTIONS_IN_FAILURE,
  ADD_QUESTION_IN_SUCCESS,
  ADD_QUESTION_IN_PROGRESS,
  ADD_QUESTION_IN_FAILURE,
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

export async function getQuestions(dispatch) {
  try {
    dispatch({ type: LOAD_QUESTIONS_IN_PROGRESS });
    const questions = localStorage.getItem("questions")
      ? JSON.parse(localStorage.getItem("questions"))
      : [];
    dispatch({ type: LOAD_QUESTIONS_IN_SUCCESS, payload: questions });
  } catch (error) {
    dispatch({
      type: LOAD_QUESTIONS_IN_FAILURE,
      error: "Something went wrong!! Please try again later",
    });
  }
}

export async function addQuestion(dispatch, payload) {
  try {
    dispatch({ type: ADD_QUESTION_IN_PROGRESS });
    let questions = localStorage.getItem("questions")
      ? JSON.parse(localStorage.getItem("questions"))
      : [];
    questions = [...questions, payload];
    localStorage.setItem("questions", JSON.stringify(questions));
    dispatch({ type: ADD_QUESTION_IN_SUCCESS, payload: questions });
    return questions;
  } catch (error) {
    dispatch({
      type: ADD_QUESTION_IN_FAILURE,
      error: "Something went wrong!! Please try again later",
    });
  }
}

export async function logout(dispatch) {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("currentUser");
}
