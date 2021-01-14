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
  EDIT_QUESTION_IN_FAILURE,
  EDIT_QUESTION_IN_PROGRESS,
  EDIT_QUESTION_IN_SUCCESS,
  DELETE_QUESTION,
  LOAD_ANSWERS_IN_FAILURE,
  LOAD_ANSWERS_IN_SUCCESS,
  LOAD_ANSWERS_IN_PROGRESS,
  LOAD_QUIZES_IN_FAILURE,
  LOAD_QUIZES_IN_SUCCESS,
  LOAD_QUIZES_IN_PROGRESS,
  ADD_QUIZ_IN_FAILURE,
  ADD_QUIZ_IN_SUCCESS,
  ADD_QUIZ_IN_PROGRESS,
  EDIT_QUIZ_IN_FAILURE,
  EDIT_QUIZ_IN_PROGRESS,
  EDIT_QUIZ_IN_SUCCESS,
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
    case EDIT_QUESTION_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case EDIT_QUESTION_IN_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case EDIT_QUESTION_IN_FAILURE:
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

export const AnswersState = {
  answers: [],
  loading: false,
  errorMessage: null,
  quizes: [],
};

export const AnswerReducer = (state = AnswersState, action) => {
  switch (action.type) {
    case LOAD_ANSWERS_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_ANSWERS_IN_SUCCESS:
      return {
        ...state,
        answers: action.payload,
        loading: false,
      };
    case LOAD_ANSWERS_IN_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case LOAD_QUIZES_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_QUIZES_IN_SUCCESS:
      return {
        ...state,
        quizes: action.payload,
        loading: false,
      };
    case LOAD_QUIZES_IN_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };

    case ADD_QUIZ_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case ADD_QUIZ_IN_SUCCESS:
      return {
        ...state,
        answers: action.payload.answers,
        quizes: action.payload.quizes,
        loading: false,
      };
    case ADD_QUIZ_IN_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case EDIT_QUIZ_IN_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case EDIT_QUIZ_IN_SUCCESS:
      return {
        ...state,
        answers: action.payload,
        loading: false,
      };
    case EDIT_QUIZ_IN_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };

    default:
      return state;
  }
};
