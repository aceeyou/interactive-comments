import { useState } from "react";
import "./index.css";

export default function AddComment({
  user,
  onPostComment,
  onPostReply,
  commentID,
  replyingTo,
  reply,
}) {
  const [text, setText] = useState("");
  return (
    <form
      className="form__add-comment"
      onSubmit={(e) => {
        setText("");

        reply
          ? onPostReply(commentID, replyingTo, text, e)
          : onPostComment(e, text);
      }}
    >
      <label htmlFor="input__add-comment" className="sr-only">
        Add a comment
      </label>
      <textarea
        id="input__add-comment"
        name="input__add-comment"
        rows={3}
        placeholder="Add a comment..."
        draggable="false"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <img
        id="add-comment__user-avatar"
        src={process.env.PUBLIC_URL + "/" + user.image.webp}
        alt="user avatar"
      />
      <button className="fw-medium" id="add-comment__form-btn" type="submit">
        {reply ? "Reply" : "Send"}
      </button>
    </form>
  );
}
