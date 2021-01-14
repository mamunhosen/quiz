import React, { useReducer, useContext } from "react";
import {
  initialState,
  AuthReducer,
  QuestionsState,
  QuestionReducer,
  AnswersState,
  AnswerReducer,
} from "./reducers";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();
const QuestionContext = React.createContext();
const QuestionDispatchContext = React.createContext();
const AnswerContext = React.createContext();
const AnswerDispatchContext = React.createContext();

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

export function useAnswerState() {
  return useContext(AnswerContext);
}

export function useAnswerDispatch() {
  return useContext(AnswerDispatchContext);
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

export const AnswerProvider = ({ children }) => {
  const [answers, dispatch] = useReducer(AnswerReducer, AnswersState);

  return (
    <AnswerContext.Provider value={answers}>
      <AnswerDispatchContext.Provider value={dispatch}>
        {children}
      </AnswerDispatchContext.Provider>
    </AnswerContext.Provider>
  );
};
