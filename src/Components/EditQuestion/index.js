import React, { useState } from "react";

import {
  useQuestionState,
  useQuestionDispatch,
  editQuestion,
} from "../../Context";
import { useForm } from "../../Utils/react-utils";
import Modal from "../Modal";

import "./editquestion.css";

const EditQuestion = ({ id, question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, errorMessage } = useQuestionState();
  const dispatch = useQuestionDispatch();

  const validateEditQuestionForm = (values) => {
    const errors = {};
    if (values.question === "") {
      errors.question = "Question must not be empty";
    }
    return errors;
  };
  const doSubmit = async ({ question }) => {
    const payload = { id, title: question };
    const response = await editQuestion(dispatch, payload);
    if (response.length > 0) {
      setIsOpen(false);
    }
  };
  const { onChange, onSubmit, values, errors } = useForm(
    {
      question,
    },
    doSubmit,
    validateEditQuestionForm,
    false
  );
  return (
    <>
      <button className="btn btn--edit" onClick={() => setIsOpen(true)}>
        Edit
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
            value="Update"
            className="btn-submit question-submit--btn"
            disabled={loading}
          />
        </form>
      </Modal>
    </>
  );
};

export default EditQuestion;
