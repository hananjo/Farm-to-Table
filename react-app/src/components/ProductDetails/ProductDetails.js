import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import React from "react";
import { getProductDetails } from "../../store/product";
import { useModal } from "../../context/Modal";
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import { loadReviews } from "../../store/review";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => {
    return state?.product.details;
  });
  console.log(product, "PRODUCTDeT");
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const {setModalContent} = useModal();
  const [showModal, setShowModal] = useState(false);

  const productz = useSelector(state => state.products[id])

  // Grabs all reviews
  const reviews = useSelector(state => state.reviews);

  // Grabs reviews based on product id only
  const filteredReviews = Object.values(reviews).filter((review) => review?.productId === productz?.id)

  // Grab current logged-in user
  const sessionUser = useSelector(state => state.session.user);

  // Grabs current logged-in user's id
  const sessionUserId = useSelector(state => state.session.user?.id);

  // Checks if product-owner is also the logged-in user
  const isOwner = productz?.owner_id === sessionUserId;

  // Checks if logged-in user has at least 1 review for a product
  const hasReviewed = filteredReviews.some((review) => review.userId === sessionUserId)

  const openModal = () => { setShowModal(true) };

  // Add Review
  const handleAddReview = async () => {
    setModalContent(<AddReviewModal id={id} />)
    openModal();
  }

  // Delete Review
  const handleDeleteReview = async () => {
    setModalContent(<DeleteReviewModal reviewId={reviewId} id={id} />)
    openModal();
  }

  return (
    <div>
      <h1>DHT</h1>
      <h2>Groceries delivered right to your door!</h2>
      {product && (
        <div>
          <div>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
          <div>
            <NavLink to={`/products/${id}/update`}>
              <button>Update</button>
            </NavLink>
            <button>Delete</button>
          </div>

          <div>
            <h2> {filteredReviews.length === 1 ? "Review" : "Reviews"} </h2>



            <button
            onClick={handleAddReview}
            disabled={!sessionUser || isOwner || hasReviewed}
            >Post a Review
            </button>

            {filteredReviews && (filteredReviews).map(review => (

            <div key={review?.id}>
            <p>{review?.User.username}</p>
            <p>{review?.review}</p>
            <p>{review?.stars}</p>

            <button
            onClick={handleDeleteReview}
            disabled={!sessionUser}
            >Delete Review
            </button>

            </div>
            ))}

          </div>

        </div>
      )}
    </div>
  );
};

export default ProductDetails;
