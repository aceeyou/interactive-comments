import "./index.css";
export default function ModalContent({
  title,
  message,
  type,
  setViewModal,
  onConfirm,
  commentID,
  itemID,
  role,
}) {
  return (
    <div className="modal-content">
      <h3 className="modal-title">{title}</h3>
      <p className="modal-message">{message}</p>
      <div className="buttons">
        <button className="negative" onClick={() => setViewModal(false)}>
          NO, CANCEL
        </button>
        <button
          className="affirmative"
          onClick={() => {
            setViewModal(false);
            role === "reply"
              ? onConfirm(role, commentID, itemID)
              : onConfirm(role, itemID);
          }}
        >
          YES, {type === "delete" ? "DELETE" : ""}
        </button>
      </div>
    </div>
  );
}
