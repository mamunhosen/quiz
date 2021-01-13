import React, { useReducer, useContext } from "react";
import {
  initialState,
  AuthReducer,
  QuestionsState,
  QuestionReducer,
} from "./reducers";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();
const QuestionContext = React.createContext();
const QuestionDispatchContext = React.createContext();

export function useAuthState() {
  return useContext(AuthStateContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}

export function useQuestionState() {
  return useContext(QuestionContext);
}

export function useQuestionDispatch() {
  return useContext(QuestionDispatchContext);
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const QuestionProvider = ({ children }) => {
  const [questions, dispatch] = useReducer(QuestionReducer, QuestionsState);

  return (
    <QuestionContext.Provider value={questions}>
      <QuestionDispatchContext.Provider value={dispatch}>
        {children}
      </QuestionDispatchContext.Provider>
    </QuestionContext.Provider>
  );
};
