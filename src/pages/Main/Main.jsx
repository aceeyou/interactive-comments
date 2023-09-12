import { useState } from "react";
import Comment from "../../components/Comment/Comment";
import CommentSection from "../CommentSection/CommentSection";
import CommentBlock from "../../layout/CommentBlock/CommentBlock";
import AddComment from "../../components/AddComment/AddComment";
import "./index.css";

let data = require("../../data.json");

export default function Main() {
  const [commentData, setCommentData] = useState(data);
  const [comments, setComments] = useState(data.comments);
  const [isReplyToComment, setIsReplyToComment] = useState(false);
  const [isReplyToReply, setIsReplyToReply] = useState(false);
  const [replyToID, setReplyToID] = useState(null);
  const DEFAULT_REPLY_TO = "comment";

  const handleAddComment = (e, text) => {
    e.preventDefault();
    if (text.length) console.log("added comment");
    let newCommentItem = {
      id: Math.random() + comments.length,
      content: text,
      createdAt: "1 day ago",
      score: 0,
      user: {
        image: {
          png: commentData.currentUser.image.png,
          webp: commentData.currentUser.image.webp,
        },
        username: commentData.currentUser.username,
      },
      replies: [],
    };
    // setCommentData(({ comments }) => [...comments, newCommentItem]);
    setComments((c) => [...c, newCommentItem]);
  };

  const handleDeleteComment = (role, commentID, replyID) => {
    let retainedComments;
    if (role === "comment") {
      retainedComments = comments.filter((comment) => comment.id !== commentID);
    } else {
      retainedComments = comments.map((comment) =>
        comment.id === commentID
          ? {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply.id !== replyID && reply
              ),
            }
          : comment
      );
    }
    setComments(retainedComments);
  };

  const handleEditContent = (content, commentID, replyID, isReply) => {
    let temp;
    if (isReply === "reply") {
      temp = comments.map((comment) =>
        comment.id === commentID
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyID ? { ...reply, content } : { ...reply }
              ),
            }
          : comment
      );
    } else {
      temp = comments.map((comment) =>
        comment.id === commentID
          ? {
              ...comment,
              content,
            }
          : comment
      );
    }
    setComments(temp);
  };

  const handlePostReply = (commentID, replyingTo, content, e) => {
    e.preventDefault();
    console.log(commentID);
    console.log(replyingTo);
    console.log(content);
    let newReply = comments.map((comment) =>
      comment.id === commentID
        ? {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Math.random() + Math.random(),
                content,
                createdAt: "1 day ago",
                score: 0,
                replyingTo,
                user: {
                  image: {
                    png: commentData.currentUser.image.png,
                    webp: commentData.currentUser.image.webp,
                  },
                  username: commentData.currentUser.username,
                },
              },
            ],
          }
        : comment
    );
    setIsReplyToComment(false);
    setIsReplyToReply(false);
    setReplyToID(null);
    setComments(newReply);
    console.log(newReply);
  };

  const handleAddReply = (role, commentID) => {
    if (DEFAULT_REPLY_TO === role) {
      setIsReplyToComment(true);
      setReplyToID(commentID);
    } else {
      setIsReplyToReply(true);
      setReplyToID(commentID);
    }
  };

  const handleScore = (role, score, commentID, replyID) => {
    let temp;
    if (role === "reply") {
      temp = comments.map((comment) =>
        comment.id === commentID
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyID ? { ...reply, score } : { ...reply }
              ),
            }
          : comment
      );
    } else {
      temp = comments.map((comment) =>
        comment.id === commentID
          ? {
              ...comment,
              score,
            }
          : comment
      );
    }
    console.log(temp);
    // setComments(temp);
  };
  return (
    <main>
      <CommentSection>
        {comments.map((comment, i) => (
          <CommentBlock key={i}>
            <Comment
              comment={comment}
              currentUsername={commentData.currentUser.username}
              setCommentData={setCommentData}
              onDeleteComment={handleDeleteComment}
              onEditContent={handleEditContent}
              onAddReply={handleAddReply}
              onScoreChange={handleScore}
              role="comment"
            />
            {isReplyToComment && replyToID === comment.id && (
              <AddComment
                user={data.currentUser}
                onPostComment={handleAddComment}
                reply={true}
                onPostReply={handlePostReply}
                commentID={comment.id}
                replyingTo={comment.user.username}
              />
            )}
            <div className="replies-container">
              {comment.replies.length > 0 &&
                comment.replies.map((reply, i) => (
                  <div key={i}>
                    <Comment
                      commentID={comment.id}
                      comment={reply}
                      currentUsername={commentData.currentUser.username}
                      setCommentData={setCommentData}
                      onEditContent={handleEditContent}
                      onDeleteComment={handleDeleteComment}
                      onAddReply={handleAddReply}
                      onScoreChange={handleScore}
                      role={"reply"}
                    />
                    {isReplyToReply && replyToID === reply.id && (
                      <AddComment
                        user={data.currentUser}
                        onPostComment={handleAddComment}
                        reply={true}
                        onPostReply={handlePostReply}
                        commentID={comment.id}
                        replyingTo={reply.user.username}
                      />
                    )}
                  </div>
                ))}
            </div>
          </CommentBlock>
        ))}
        {/* <Comment comment={data.comments[1]} /> */}
        <AddComment
          user={data.currentUser}
          onPostComment={handleAddComment}
          // onPostReply={handlePostReply}
        />
      </CommentSection>
    </main>
  );
}
