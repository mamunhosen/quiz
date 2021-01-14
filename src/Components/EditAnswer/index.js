import React, { useState } from "react";

import { editAnswers, useAnswerDispatch } from "../../Context";
import { useForm } from "../../Utils/react-utils";
import Modal from "../Modal";

import "./editanswer.css";

const EditAnswer = ({ disabled, answerObj, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAnswerDispatch();

  const validateEditAnswerForm = (values) => {
    const errors = {};
    if (values.answer === "") {
      errors.answer = "Answer must not be empty";
    }
    return errors;
  };
  const doSubmit = async ({ answer }) => {
    const histories = [...answerObj.editHistories, answerObj.answer];
    const payload = { ...answerObj, answer, editHistories: histories };
    const user_id = user.isAdmin ? "" : user.id;
    const response = await editAnswers(payload, dispatch, user_id);
    if (response) {
      setIsOpen(false);
    }
  };
  const { onChange, onSubmit, values, errors } = useForm(
    {
      answer: answerObj.answer,
    },
    doSubmit,
    validateEditAnswerForm,
    false
  );
  return (
    <>
      <button
        disabled={disabled}
        className="btn btn--edit"
        onClick={() => setIsOpen(true)}
      >
        Edit
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <form className="question__form" onSubmit={onSubmit} noValidate>
          <div className="input-group">
            <label className="input-label" htmlFor="answer">
              {answerObj.title}
            </label>
            <textarea
              name=""
              id="answer"
              rows="5"
              onChange={onChange}
              name="answer"
              className="textarea"
              placeholder="Describe yourself here..."
              value={values.answer}
            ></textarea>

            {errors.answer && <p className="error">{errors.answer}</p>}
          </div>
          <input
            type="submit"
            value="Update"
            className="btn-submit question-submit--btn"
          />
        </form>
      </Modal>
    </>
  );
};

export default EditAnswer;
