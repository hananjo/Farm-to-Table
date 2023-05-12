import { useDispatch } from "react-redux";
import { getProductDetails } from "../../store/product";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteReview, load, loadReviews } from "../../store/review";
import "./DeleteReviewModal.css";
const DeleteReviewModal = ({ id, productId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const removeReview = async (e) => {
    e.preventDefault();
    await dispatch(deleteReview(id && id));
    // await dispatch(getProductDetails(productId));
    // await dispatch(loadReviews(productId))
    closeModal();
  };

  return (
    <div className="confirm-delete-container">
      <h2 className="confirm-delete-h2">Delete Review Confirmation</h2>
      <p className="confirm-delete-message">
        Are you sure you want to delete this review?
      </p>

      <div className="review-button-container">
        <button className="review-choices" onClick={removeReview}>
          Yes
        </button>
        <button className="review-choices" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
