import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addReview, createReview, loadReviews } from "../../store/review";
import "./AddReviewModal.css";
import { getProductDetails } from "../../store/product";
const AddReviewModal = ({ reviews, id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { productId } = useParams();
  console.log(id, "ID2");
  const product = useSelector((state) => state.product);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { closeModal } = useModal();

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReviewInput = {
      user_id: sessionUser.id,
      product_id: id,
      review: review,
      rating: rating,
    };

    console.log(newReviewInput);
    console.log(id, "ID");
    await dispatch(createReview(newReviewInput, id));
    await dispatch(getProductDetails(id));
    closeModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="add-review-modal">
          <label className="review-textarea">
            <div className="add-review-title">
              Leave a review for this product
            </div>
            <textarea
              placeholder="Type your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="textarea-add-review"
            ></textarea>
          </label>
          <div className="rating-and-submit-button">
            <label className="stars-input">
              <div className="rating-text">Rating:</div>
              <input
                type="number"
                value={rating}
                min={1}
                max={5}
                onChange={(e) => setRating(e.target.value)}
                className="rating-input"
              ></input>
            </label>

            <button className="submit-review-button" type="submit">
              Submit Review
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddReviewModal;
