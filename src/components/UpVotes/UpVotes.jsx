import { useState } from "react";

import "./index.css";

export default function UpVotes({
  votes = 0,
  onScoreChange,
  commentID,
  role,
  replyID = null,
}) {
  const [count, setCount] = useState(votes);
  const handleIncrement = () => {
    setCount((c) => c + 1);
    onScoreChange(role, count + 1, commentID, replyID);
  };

  const handleDecrement = () => {
    setCount((c) => c - 1);
    onScoreChange(role, count - 1, commentID, replyID);
  };
  return (
    <div className="upvotes-container">
      <button className="button upvote-btn" onClick={() => handleIncrement()}>
        <img
          src={process.env.PUBLIC_URL + `/images/icon-plus.svg`}
          alt="plus icon"
        />
      </button>
      <p className="fw-medium upvote-count">{count}</p>
      <button className="button downvote-btn" onClick={() => handleDecrement()}>
        <img
          src={process.env.PUBLIC_URL + `/images/icon-minus.svg`}
          alt="plus icon"
        />
      </button>
    </div>
  );
}
