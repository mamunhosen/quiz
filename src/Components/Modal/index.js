import React from "react";
import ReactDOM from "react-dom";

import "./modal.css";

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="overlay" />
      <div className="modal">
        <div className="modal__header">
          <span onClick={onClose} className="modal__close">
            &times;
          </span>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
