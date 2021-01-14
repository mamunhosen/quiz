import React, { useState } from "react";

import Modal from "../Modal";

import "./answerhistory.css";

const AnswerHistory = ({ histories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="previous-btn" onClick={() => setIsOpen(true)}>
        Prev Answers
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {histories.length > 0 ? (
          histories.map((history, index) => (
            <p className="history" key={index}>
              {history}
            </p>
          ))
        ) : (
          <p className="no--result">No rows found!!!</p>
        )}
      </Modal>
    </>
  );
};

export default AnswerHistory;
