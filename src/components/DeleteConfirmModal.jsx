import Modal from "./Modal.jsx";

export default function DeleteConfirmModal({ student, onConfirm, onClose }) {
  return (
    <Modal title="Delete student" onClose={onClose}>
      <p>
        Delete <strong>{student.fullName}</strong> ({student.id})? This cannot be undone.
      </p>
      <div className="modal-actions">
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-danger" onClick={() => onConfirm(student.id)}>
          Delete student
        </button>
      </div>
    </Modal>
  );
}
