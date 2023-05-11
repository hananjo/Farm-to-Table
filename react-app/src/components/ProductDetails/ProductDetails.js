import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import React from "react";
import { getProductDetails, deleteProduct } from "../../store/product";
// import { addToCart } from "../../store/cart"
import { useModal } from "../../context/Modal";
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import { loadReviews } from "../../store/review";
import CartQtyForm from "../CartQtyForm";
import CartAddForm from "../CartAddForm"

const ProductDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state) => {
    return state?.session.user;
  });
  const product = useSelector((state) => {
    return state?.product.details;
  });
  // console.log(product, "PRODUCTDeT");
  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(loadReviews(id))
  }, [dispatch, id]);

  // console.log(product.description)


  const products = useSelector(state => state.product)
  // console.log(products, "PRODUCTS")
  // console.log(products.details.owner_id)

  const {setModalContent} = useModal();
  const [showModal, setShowModal] = useState(false);

  // Grabs all reviews
  const reviews = useSelector(state => state.reviews);
  // console.log(reviews)
  // Grabs reviews based on product id only
  const filteredReviews = Object.values(reviews).filter((review) => review?.product_id === products?.id)

 console.log(filteredReviews, "48")

  // const reviewUserId = reviews[1].userId

  // Grab current logged-in user
  const sessionUser = useSelector(state => state?.session.user);
  // console.log(sessionUser)

  // Grabs current logged-in user's id
  const sessionUserId = useSelector(state => state.session.user?.id);

  // Checks if product-owner is also the logged-in user
  const isOwner = product && product.owner_id === sessionUserId;
  // console.log(isOwner)

  // Checks if logged-in user has at least 1 review for a product
  const hasReviewed = filteredReviews.some((review) => review.userId === sessionUserId)

  const openModal = () => { setShowModal(true) };

  // Add Review
  const handleAddReview = async () => {
    setModalContent(<AddReviewModal id={id} />)
    openModal();
  }

  // Delete Review
  const handleDeleteReview = async (reviewId) => {
    console.log(reviewId, "67")
    setModalContent(<DeleteReviewModal id={reviewId} productId={id} />)
    openModal();
  }

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleDelete = () => {
    dispatch(deleteProduct(id));
    setShowMenu(false);
    history.push("/");
  };

  const handleAddtoCart = () => {
    setModalContent(<CartAddForm id={product.id} fCls={"add"} />)
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
            <p>{product.type}</p>
          </div>
          <div>
            <button onClick={() => handleAddtoCart()}>Add to Cart</button>
          </div>
          {/* <div>
            <NavLink to={`/products/${id}/update`}>
              <button>Update</button>
            </NavLink>
            <button>Delete</button>
          </div> */}

          <div>
            <h2> {filteredReviews.length === 1 ? "Review" : "Reviews"} </h2>

            <button
            onClick={handleAddReview}
            // disabled={!sessionUser || isOwner || hasReviewed}
            >Post a Review
            </button>

            {filteredReviews && (filteredReviews).map(review => (

            <div key={review?.id}>
            <p>{review?.User}</p>
            <p>{review?.review}</p>
            <p>{review?.stars}</p>

            {user && reviews && user.id === review.userId ? (

              <button
              id={review?.id}
              onClick={() => handleDeleteReview(review.id, product.id)}
              >Delete Review
            </button>
              ):(
                <br/>
              )}

            </div>
            ))}

          </div>

          {user && product && user.id === product.owner_id ? (
            <div>
              <NavLink to={`/products/${id}/update`}>
                <button>Update</button>
              </NavLink>

              <button onClick={openMenu}>Delete</button>
              {showMenu && (
                //   <OpenModalButton>
                <div className="delete-modal">
                  <div className="delete-title">
                    <h3> Confirm Delete</h3>
                  </div>
                  <div className="delete-question">
                    <p> Are you sure you want to remove this product?</p>
                  </div>
                  <div className="confirmation-delete-buttons">
                    <button className="delete-button" onClick={handleDelete}>
                      Yes (Delete Product)
                    </button>

                    <button className="keep-button" onClick={closeMenu}>
                      No (Keep Product)
                    </button>
                  </div>
                </div>
                //   </OpenModalButton>
              )}
            </div>
          ) : (
            <br />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
