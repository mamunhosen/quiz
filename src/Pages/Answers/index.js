import React, { useEffect } from "react";
import AnswerHistory from "../../Components/AnswerHistory";
import EditAnswer from "../../Components/EditAnswer";

import PlayQuiz from "../../Components/PlayQuiz";
import {
  getAnswers,
  useAnswerState,
  useAnswerDispatch,
  useAuthState,
} from "../../Context";

import "./answers.css";

const Answers = () => {
  const dispatch = useAnswerDispatch();
  const { loading, answers } = useAnswerState();
  const { user } = useAuthState();
  useEffect(() => {
    const user_id = user.isAdmin ? "" : user.id;
    getAnswers(dispatch, user_id);
  }, []);

  const loadingMessage = <div className="loading">Loading answers...</div>;
  const content = (
    <>
      <div className="answer-header">
        <div className="answer-header__serial">#</div>
        <div className="answer-header__title">Question</div>
        <div className="answer-header__given">Answer</div>
        <div className="answer-header__action">Action</div>
      </div>
      <div className="answers">
        {answers.length > 0 ? (
          answers.map((item, index) => (
            <div className="answer" key={item.id}>
              <div className="answer__serial">{index + 1}</div>
              <div className="answer__title">{item.title}</div>
              <div className="answer__given">{item.answer}</div>
              <div className="answer__action">
                <EditAnswer
                  disabled={user.id !== item.user_id}
                  answerObj={item}
                  user={user}
                />
                <AnswerHistory histories={item.editHistories} />
              </div>
            </div>
          ))
        ) : (
          <p className="no--result">No rows found!!!</p>
        )}
      </div>
    </>
  );

  return (
    <div className="answer-wrapper">
      <PlayQuiz user={user} />
      {loading ? loadingMessage : content}
    </div>
  );
};

export default Answers;
