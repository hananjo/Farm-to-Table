import { useDispatch } from "react-redux";
import { getProductDetails } from "../../store/product";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteReview, load, loadReviews } from "../../store/review";

const DeleteReviewModal = ({reviewId, productId}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const removeReview = async(e) => {
        e.preventDefault();
        await dispatch(deleteReview(reviewId && reviewId));
        await dispatch(getProductDetails(productId));
        // await dispatch(loadReviews(productId));
        closeModal();
    }

    return (
        <div>
            <h2>Delete Review Confirmation</h2>
            <p>Are you sure you want to delete this review?</p>

            <div className="review buttons">
                <button onClick={removeReview}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal;
