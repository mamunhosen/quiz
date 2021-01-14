import React, { useState, useEffect } from "react";

import {
  getQuizQuestions,
  submitQuiz,
  useAnswerState,
  useAnswerDispatch,
} from "../../Context";
import { useForm } from "../../Utils/react-utils";
import { uuid } from "../../Utils/utils";
import Modal from "../Modal";

import "./playquiz.css";

const PlayQuiz = ({ user }) => {
  const dispatch = useAnswerDispatch();
  const { quizes } = useAnswerState();
  const [isOpen, setIsOpen] = useState(false);
  const validateQuestionForm = (values) => {
    const errors = {};
    for (const property in values) {
      if (values[property] === "") {
        errors[property] = "Answer field must not be empty";
      }
    }

    return errors;
  };

  const doSubmit = async (answers) => {
    const payload = quizes.map((quiz) => {
      return {
        ...quiz,
        id: uuid(),
        question_id: quiz.id,
        answer: answers[quiz.id],
        user_id: user.id,
        editHistories: [],
      };
    });
    const response = await submitQuiz(payload, dispatch, user);
    if (response) {
      setIsOpen(false);
    }
  };

  const initialState = () => {
    let obj = {};
    for (let index = 0; index < quizes.length; index++) {
      obj[quizes[index].id] = "";
    }
    return obj;
  };
  const { onChange, onSubmit, values, errors } = useForm(
    initialState(),
    doSubmit,
    validateQuestionForm
  );

  useEffect(() => {
    (async () => {
      await getQuizQuestions(user.id, dispatch);
    })();
  }, []);

  const renderQuizContent = () => {
    return quizes.map((quiz, index) => (
      <div className="input-group" key={quiz.id}>
        <label className="input-label" htmlFor={`question__title${index + 1}`}>
          {quiz.title}
        </label>
        <textarea
          name=""
          id={`question__title${index + 1}`}
          rows="5"
          onChange={onChange}
          name={quiz.id}
          className="textarea"
          placeholder="Describe yourself here..."
          value={values[quiz.id]}
        ></textarea>

        {errors[quiz.id] && <p className="error">{errors[quiz.id]}</p>}
      </div>
    ));
  };
  return (
    <>
      <button className="btn--play" onClick={() => setIsOpen(true)}>
        Play Quiz
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <form className="question__form" onSubmit={onSubmit} noValidate>
          {quizes.length > 0 ? (
            <>
              {renderQuizContent()}
              <input
                type="submit"
                value="Submit"
                className="btn-submit question-submit--btn"
              />
            </>
          ) : (
            <p className="no--result">No questions found!!!</p>
          )}
        </form>
      </Modal>
    </>
  );
};

export default PlayQuiz;
