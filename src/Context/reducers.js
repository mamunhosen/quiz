import {
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOAD_QUESTIONS_IN_PROGRESS,
  LOAD_QUESTIONS_IN_SUCCESS,
  LOAD_QUESTIONS_IN_FAILURE,
  ADD_QUESTION_IN_FAILURE,
  ADD_QUESTION_IN_PROGRESS,
  ADD_QUESTION_IN_SUCCESS,
  DELETE_QUESTION,
} from "./actionTypes";

const user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : "";

export const initialState = {
  user: "" || user,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        errorMessage: "",
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: "",
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };

    default:
      return state;
  }
};

export const QuestionsState = {
  questions: [],
  loading: false,
  errorMessage: null,
};

export const QuestionReducer = (state = QuestionsState, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_QUESTIONS_IN_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case LOAD_QUESTIONS_IN_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case ADD_QUESTION_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case ADD_QUESTION_IN_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case ADD_QUESTION_IN_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case DELETE_QUESTION:
      return {
        ...state,
        questions: action.payload,
      };

    default:
      return state;
  }
};
