import React from "react";
import "./Modal.css"; // Optional: For styling the modal

const Modal = ({ isOpen, onClose, reviews }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h4>Reviews:</h4>
        {reviews.length > 0 ? (
          <ul style={{ paddingLeft: "20px" }}>
            {reviews.map((review, index) => (
              <li key={index}>
                <strong>{review.author}:</strong> {review.comment} (Rating:{" "}
                {review.rating}/5)
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
