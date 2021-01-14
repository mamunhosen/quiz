import React, { useState, useEffect } from "react";

import Modal from "../../Components/Modal";
import { useForm } from "../../Utils/react-utils";
import { uuid } from "../../Utils/utils";
import {
  getQuestions,
  addQuestion,
  useQuestionState,
  useQuestionDispatch,
} from "../../Context";
import Delete from "../../Components/Delete";
import EditQuestion from "../../Components/EditQuestion";

import "./questions.css";

const Questions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useQuestionDispatch();
  const { loading, errorMessage, questions } = useQuestionState();

  const validateQuestionForm = (values) => {
    const errors = {};
    if (values.question === "") {
      errors.question = "Question must not be empty";
    }
    return errors;
  };

  const doSubmit = async ({ question }) => {
    const payload = { id: uuid(), title: question };
    const response = await addQuestion(dispatch, payload);
    if (response.length > 0) {
      setIsOpen(false);
    }
  };

  const { onChange, onSubmit, values, errors } = useForm(
    {
      question: "",
    },
    doSubmit,
    validateQuestionForm
  );

  useEffect(() => {
    getQuestions(dispatch);
  }, []);

  const loadingMessage = <div className="loading">Loading questions...</div>;
  const content = (
    <>
      <div className="question-header">
        <div className="question-header__serial">#</div>
        <div className="question-header__title">Title</div>
        <div className="question-header__action">Action</div>
      </div>
      <div className="questions">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div className="question" key={question.id}>
              <div className="question__serial">{index + 1}</div>
              <div className="question__title">{question.title}</div>
              <div className="question__action">
                <EditQuestion id={question.id} question={question.title} />
                <Delete id={question.id} />
              </div>
            </div>
          ))
        ) : (
          <p className="no--result">No question added yet!!!</p>
        )}
      </div>
    </>
  );

  return (
    <div className="question-wrapper">
      <button className="add-question" onClick={() => setIsOpen(true)}>
        Add Question
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <form className="question__form" onSubmit={onSubmit} noValidate>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <div className="input-group">
            <label className="input-label" htmlFor="question__title">
              Question Title
            </label>
            <input
              type="text"
              className="input-field"
              id="question__title"
              name="question"
              onChange={onChange}
              value={values.question}
            />
            {errors.question && <p className="error">{errors.question}</p>}
          </div>
          <input
            type="submit"
            value="Add"
            className="btn-submit question-submit--btn"
            disabled={loading}
          />
        </form>
      </Modal>
      {loading ? loadingMessage : content}
    </div>
  );
};

export default Questions;
