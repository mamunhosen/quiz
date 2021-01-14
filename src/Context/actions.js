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
  EDIT_QUESTION_IN_SUCCESS,
  EDIT_QUESTION_IN_PROGRESS,
  EDIT_QUESTION_IN_FAILURE,
  DELETE_QUESTION,
  LOAD_ANSWERS_IN_PROGRESS,
  LOAD_ANSWERS_IN_SUCCESS,
  LOAD_ANSWERS_IN_FAILURE,
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

export async function editQuestion(dispatch, payload) {
  try {
    dispatch({ type: EDIT_QUESTION_IN_PROGRESS });
    let questions = localStorage.getItem("questions")
      ? JSON.parse(localStorage.getItem("questions"))
      : [];
    questions = questions.map((question) => {
      if (question.id === payload.id) {
        question.title = payload.title;
      }
      return question;
    });
    localStorage.setItem("questions", JSON.stringify(questions));
    dispatch({ type: EDIT_QUESTION_IN_SUCCESS, payload: questions });
    return questions;
  } catch (error) {
    dispatch({
      type: EDIT_QUESTION_IN_FAILURE,
      error: "Something went wrong!! Please try again later",
    });
  }
}

export async function deleteQuestion(dispatch, id) {
  let questions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];
  const deletableQues = questions.find((ques) => ques.id === id);
  const deletableQuesIndex = questions.indexOf(deletableQues);
  if (deletableQuesIndex > -1) {
    questions.splice(deletableQuesIndex, 1);
    localStorage.setItem("questions", JSON.stringify(questions));
    dispatch({ type: DELETE_QUESTION, payload: questions });
  }
}

export async function getAnswers(dispatch, userId) {
  try {
    dispatch({ type: LOAD_ANSWERS_IN_PROGRESS });
    let answers = localStorage.getItem("answers")
      ? JSON.parse(localStorage.getItem("answers"))
      : [];
    if (userId) {
      answers = answers.filter((answer) => answer.user_id === userId);
    }
    dispatch({ type: LOAD_ANSWERS_IN_SUCCESS, payload: answers });
  } catch (error) {
    dispatch({
      type: LOAD_ANSWERS_IN_FAILURE,
      error: "Something went wrong!! Please try again later",
    });
  }
}

export async function getQuizQuestions(userId) {
  const allQuestions = localStorage.getItem("questions")
    ? JSON.parse(localStorage.getItem("questions"))
    : [];
  const allAnswers = localStorage.getItem("answers")
    ? JSON.parse(localStorage.getItem("answers"))
    : [];
  const givenQuesIds = allAnswers.map((answer) => {
    if (answer.user_id === userId) {
      return answer.question_id;
    }
  });
  const quizQuestions = allQuestions.filter(
    (item) => !givenQuesIds.includes(item.id)
  );
  return quizQuestions;
}

export async function submitQuiz(payload) {
  try {
    let allAnswers = localStorage.getItem("answers")
      ? JSON.parse(localStorage.getItem("answers"))
      : [];
    allAnswers = [...allAnswers, ...payload];
    localStorage.setItem("answers", JSON.stringify(allAnswers));
    return true;
  } catch (error) {
    return false;
  }
}

export async function logout(dispatch) {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("currentUser");
}
