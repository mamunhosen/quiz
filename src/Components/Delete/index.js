import React from "react";

import { useQuestionDispatch, deleteQuestion } from "../../Context";

import "./delete.css";

const Delete = ({ id }) => {
  const dispatch = useQuestionDispatch();
  const handleClick = async () => {
    if (window.confirm("Delete the item?")) {
      await deleteQuestion(dispatch, id);
    }
  };
  return (
    <button className="btn btn--delete" onClick={handleClick}>
      Delete
    </button>
  );
};

export default Delete;
