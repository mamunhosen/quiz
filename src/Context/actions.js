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
  LOAD_QUIZES_IN_PROGRESS,
  LOAD_QUIZES_IN_SUCCESS,
  LOAD_QUIZES_IN_FAILURE,
  ADD_QUIZ_IN_FAILURE,
  ADD_QUIZ_IN_PROGRESS,
  ADD_QUIZ_IN_SUCCESS,
  EDIT_QUIZ_IN_FAILURE,
  EDIT_QUIZ_IN_PROGRESS,
  EDIT_QUIZ_IN_SUCCESS,
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

export async function getQuizQuestions(userId, dispatch) {
  try {
    dispatch({ type: LOAD_QUIZES_IN_PROGRESS });
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
      return null;
    });
    const quizQuestions = allQuestions.filter(
      (item) => !givenQuesIds.includes(item.id)
    );
    dispatch({ type: LOAD_QUIZES_IN_SUCCESS, payload: quizQuestions });
  } catch (error) {
    dispatch({
      type: LOAD_QUIZES_IN_FAILURE,
      error: "Something went wrong!! Please try again later",
    });
  }
}

export async function submitQuiz(payload, dispatch, user) {
  try {
    dispatch({ type: ADD_QUIZ_IN_PROGRESS });
    let allAnswers = localStorage.getItem("answers")
      ? JSON.parse(localStorage.getItem("answers"))
      : [];
    allAnswers = [...allAnswers, ...payload];
    localStorage.setItem("answers", JSON.stringify(allAnswers));
    if (!user.isAdmin) {
      allAnswers = allAnswers.filter((answer) => answer.user_id === user.id);
    }
    const allQuestions = localStorage.getItem("questions")
      ? JSON.parse(localStorage.getItem("questions"))
      : [];
    const givenQuesIds = allAnswers.map((answer) => {
      if (answer.user_id === user.id) {
        return answer.question_id;
      }
      return null;
    });
    const quizQuestions = allQuestions.filter(
      (item) => !givenQuesIds.includes(item.id)
    );
    dispatch({
      type: ADD_QUIZ_IN_SUCCESS,
      payload: { answers: allAnswers, quizes: quizQuestions },
    });
    return true;
  } catch (error) {
    dispatch({
      type: ADD_QUIZ_IN_FAILURE,
      error: "Something went wrong!! Please try again later",
    });
  }
}

export async function editAnswers(payload, dispatch, userId) {
  try {
    dispatch({ type: EDIT_QUIZ_IN_PROGRESS });
    let answers = localStorage.getItem("answers")
      ? JSON.parse(localStorage.getItem("answers"))
      : [];
    answers = answers.map((answer) => {
      if (answer.id === payload.id) {
        return payload;
      }
      return answer;
    });
    localStorage.setItem("answers", JSON.stringify(answers));
    if (userId) {
      answers = answers.filter((answer) => answer.user_id === userId);
    }
    dispatch({ type: EDIT_QUIZ_IN_SUCCESS, payload: answers });
    return true;
  } catch (error) {
    dispatch({
      type: EDIT_QUIZ_IN_FAILURE,
      error: "Something went wrong!! Please try again later",
    });
  }
}

export async function logout(dispatch) {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("currentUser");
}
