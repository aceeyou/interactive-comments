import ModalContent from "../ModalContent/ModalContent";
import "./index.css";

export default function Modal({
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
    <div className="modal-container">
      <ModalContent
        type={type}
        title={title}
        message={message}
        setViewModal={setViewModal}
        onConfirm={onConfirm}
        commentID={commentID}
        itemID={itemID}
        role={role}
      />
    </div>
  );
}
