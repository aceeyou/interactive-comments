import { useState } from "react";
import Modal from "../Modal/Modal";
import UpVotes from "../UpVotes/UpVotes";
import "./index.css";

export default function Comment({
  comment,
  commentID,
  currentUsername,
  onPostComment,
  onDeleteComment,
  onEditContent,
  onAddReply,
  onScoreChange,
  role = "comment",
}) {
  const [viewModal, setViewModal] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  return (
    <article>
      <div className="comment-item" role={role}>
        <div className="post-description-container">
          <div className="post-description">
            <img
              className="createdBy__img"
              src={process.env.PUBLIC_URL + "/" + comment.user.image.webp}
              alt="user avatar"
            />
            <h1 className="createdBy__name fw-bold">{comment.user.username}</h1>
            {currentUsername === comment.user.username && (
              <div className="you-container">
                <p className="you">you</p>
              </div>
            )}
            <p className="createdBy__post-time fw-regular">
              {comment.createdAt}
            </p>
          </div>
        </div>
        <div className="content">
          {editComment ? (
            <>
              <label htmlFor="edit__content" className="sr-only">
                Edit comment content
              </label>
              <textarea
                autoCorrect="false"
                autoComplete="false"
                rows={5}
                type="text"
                id="edit__content"
                className="input__edit-content"
                name="edit content"
                value={
                  role === "reply"
                    ? `@${comment.replyingTo} ${editedContent}`
                    : editedContent
                }
                onChange={(e) => {
                  // let edited = e.target.value.replace(
                  //   `@${comment.replace}`,
                  //   ""
                  // );
                  // console.log(edited);
                  // setEdit(edited);

                  setEditedContent(
                    e.target.value.replace(`@${comment.replyingTo} `, "")
                  );
                }}
              ></textarea>
              <button
                className="update-btn"
                onClick={() => {
                  setEditComment(false);
                  role === "comment"
                    ? onEditContent(editedContent, comment.id, null, role)
                    : onEditContent(editedContent, commentID, comment.id, role);
                }}
              >
                UPDATE
              </button>
            </>
          ) : (
            <p>
              {role === "reply" ? (
                <>
                  <span className="replying-to">@{comment.replyingTo}</span>{" "}
                  {comment.content}
                </>
              ) : (
                comment.content
              )}
            </p>
          )}
        </div>
        <UpVotes
          votes={comment.score}
          onScoreChange={onScoreChange}
          role={role}
          commentID={role === "comment" ? comment.id : commentID}
          replyID={role === "comment" ? null : comment.id}
        />
        <div className="comment-controls-container">
          {/* <UpVotes /> */}
          {currentUsername === comment.user.username ? (
            <>
              <button className="delete-btn" onClick={() => setViewModal(true)}>
                <img
                  className="btn-icon"
                  src={process.env.PUBLIC_URL + `/icon-delete.svg`}
                  alt="delete icon"
                />
                <p className="control-text fw-medium">Delete</p>
              </button>
              <button className="edit-btn" onClick={() => setEditComment(true)}>
                <img
                  className="btn-icon"
                  src={process.env.PUBLIC_URL + `/icon-edit.svg`}
                  alt="edit icon"
                />
                <p className="control-text fw-medium">Edit</p>
              </button>
            </>
          ) : (
            <button
              className="edit-btn"
              onClick={() => {
                onAddReply(role, comment.id);
              }}
            >
              <img
                className="btn-icon"
                src={process.env.PUBLIC_URL + `/icon-reply.svg`}
                alt="edit icon"
              />
              <p className="control-text fw-medium">Reply</p>
            </button>
          )}
        </div>
      </div>
      {viewModal && (
        <Modal
          type="delete"
          title="Delete comment"
          message="Are you sure to delete this comment? This will remove the comment
            and can't be undone."
          setViewModal={setViewModal}
          onConfirm={onDeleteComment}
          commentID={commentID}
          itemID={comment.id}
          role={role}
        />
      )}
    </article>
  );
}
