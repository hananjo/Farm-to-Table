import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addReview, createReview, loadReviews } from "../../store/review";


const AddReviewModal = ({reviews, productId}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user.id);


    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const {closeModal} = useModal();

    const handleModalClose = () => {
        setModalOpen(false);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newReviewInput = {
            ...reviews,
            productId: productId,
            review: review,
            stars: stars,
        };

        let newReview;
        newReview = await dispatch(createReview(newReviewInput));

        if(newReview) {
            await dispatch(addReview(newReview));
            await dispatch(loadReviews(productId));
            // history.go(`/products/${productId}`);
        }

        closeModal();
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label className="review-textarea">
                <div>Leave a review for this product</div>
                <textarea
                    placeholder="Type your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
            </label>

            <label className="stars-input">
                <div>Rating</div>
                <input
                    type="number"
                    value={stars}
                    min={1}
                    max={5}
                    onChange={(e) => setStars(e.target.value)}
                ></input>
            </label>

            <button
            className="submit-review-button"
            type="submit">Submit Review</button>
        </form>
        </>
    )
}

export default AddReviewModal;
