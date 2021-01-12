import {
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from "./actionTypes";

const user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";

export const initialState = {
  user: "" || user,
  loading: false,
  errorMessage: null,
  isLoggedin: false,
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
        isLoggedin: true,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedin: false,
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
