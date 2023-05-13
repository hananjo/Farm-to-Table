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
import DeleteProductModal from "../DeleteProductModal/DeleteProductModal";
import { loadReviews } from "../../store/review";
import CartAddForm from "../CartAddForm";
import "./ProductDetails.css";
import DuplicateAdd from "../Duplicate";
import { getCart } from "../../store/cart";
import OwnerAdd from "../Owned";
import NotFound from "../PageNotFound";

const ProductDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => {
    return state?.session.user;
  });
  const product = useSelector((state) => {
    return state?.product.details;
  });

  // console.log(product, "PRODUCTDeT");
  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(loadReviews(id));
    setLoading(true)
  }, [dispatch, id]);

  // console.log(product.description)

  const products = useSelector((state) => state.product);
  const product_reviews = useSelector(
    (state) => state?.product?.details?.reviews
  );
  // console.log(product_reviews, "REVIEWS");
  // console.log(products, "PRODUCTS")
  // console.log(products.details.owner_id)

  // if (loading && !products?.details?.id) {
  //   console.log(products?.details?.id);
  //   history.push("/not_found")
  // }

  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);

  // Grabs all reviews
  const reviews = useSelector((state) => state.reviews);

  // Grabs reviews based on product id only
  const filteredReviews = Object.values(reviews).filter(
    (review) => review?.product_id === products?.id
  );

  console.log(filteredReviews, "48");

  // const reviewUserId = reviews[1].userId

  // Grab current logged-in user
  const sessionUser = useSelector((state) => state?.session.user);
  // console.log(sessionUser)

  // Grabs current logged-in user's id
  const sessionUserId = useSelector((state) => state.session.user?.id);

  // Checks if product-owner is also the logged-in user
  const isOwner = product && product.owner_id === sessionUserId;
  // console.log(isOwner)

  // Checks if logged-in user has at least 1 review for a product
  const hasReviewed = filteredReviews.some(
    (review) => review.userId === sessionUserId
  );

  const openModal = () => {
    setShowModal(true);
  };

  // Add Review
  const handleAddReview = async () => {
    setModalContent(<AddReviewModal id={id} />);
    openModal();
  };

  // Delete Review
  const handleDeleteReview = async (reviewId) => {
    console.log(reviewId, "67");
    setModalContent(<DeleteReviewModal id={reviewId} productId={id} />);
    // await dispatch(loadReviews(id));
    openModal();
  };

  const handleDeleteProduct = async (id) => {
    // console.log(reviewId, "67");
    setModalContent(<DeleteProductModal id={id} />);
    openModal();
  };

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getCart(user.id));
    setIsLoaded(true)
  }, [dispatch, user])

  const cart = useSelector(state => state.cart)

  const cartArr = isLoaded && cart && Object.values(cart)

  console.log("cart items", cartArr);

  const handleAddtoCart = () => {
    let isDuplicate = false
    let cartRel = {}

    console.log("Compare ", product.id, user.id);

    if (user.id === product.owner_id) {
      setModalContent(<OwnerAdd prod={cartRel} fCls={"update"} />);
      openModal();
    } else {
      cartArr.forEach((rel) => {
        console.log(rel.product_id, rel.user_id);
        if (rel.product_id === product.id && rel.user_id === user.id) {
          isDuplicate = true
          cartRel = rel
        }
      })

      console.log(isDuplicate);

      if (isDuplicate) {
        console.log("Duplicate");
        setModalContent(<DuplicateAdd prod={cartRel} fCls={"update"} />);
        openModal();
      } else {
        setModalContent(<CartAddForm id={product.id} fCls={"add"} />);
        openModal();
      }
    }
  };

  return (
    <div className="detail-page-container">
      {product && product?.id ? (
        <div>
          <div className="product-image-and-info-container">
            <div className="product-image-detail">
              <img
                src={product && product.images && product?.images[0]?.image_url}
                style={{ width: "450px", height: "400px" }}
              />
            </div>
            <div className="product-detail-information">
              <div className="product-detail-price">
                <p>${product.price.toFixed(2)}</p>
              </div>
              <div className="product-detail-name">
                <p>{product.name}</p>
              </div>
              <div className="product-detail-description">
                <p>{product.description}</p>
              </div>

              <p>Product type: {product.type}</p>
              {user && product && user.id === product.owner_id ? (
                <div className="update-and-delete-buttons">
                  <NavLink to={`/products/${id}/update`}>
                    <button className="update-detail-button">Update</button>
                  </NavLink>

                  <button
                    className="delete-detail-button"
                    onClick={() => handleDeleteProduct(id)}
                    // onClick={openMenu}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <br />
              )}
              <div className="add-to-cart-button">
                <button
                  className="add-to-cart"
                  onClick={() => handleAddtoCart()}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="review-container">
            <div className="review-title">
              <h2>
                {" "}
                {product_reviews.length === 1 ? "Review" : "Reviews"} (
                {product_reviews.length})
              </h2>
              {/* <h2> Average Rating: {averageRating}</h2> */}
            </div>

            <button
              className="review-button"
              onClick={handleAddReview}
            // disabled={!sessionUser || isOwner || hasReviewed}
            >
              Post a Review
            </button>

            {product_reviews &&
              product_reviews.map((review) => (
                <div key={review?.id}>
                  <p>{review?.User}</p>
                  <div className="avatar-and-review">
                    <div className="avatars">
                      <p>
                        {review?.userId === 1 && (
                          <img
                            style={{ width: "70px" }}
                            src={
                              "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683857034/avatar_3_nq1o1b.jpg"
                            }
                          />
                        )}
                      </p>
                      <p>
                        {review?.userId === 2 && (
                          <img
                            style={{ width: "70px" }}
                            src={
                              "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683857034/avatar_2_rba8yf.jpg"
                            }
                          />
                        )}
                      </p>
                      <p>
                        {review?.userId === 3 && (
                          <img
                            style={{ width: "70px" }}
                            src={
                              "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683857034/avatar_1_mhmsrt.png"
                            }
                          />
                        )}
                      </p>
                    </div>
                    <div className="stars">
                      <p>
                        {review?.rating === 1 && (
                          <img
                            style={{ width: "190px" }}
                            src={
                              "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683855981/one_star_huo5jx.jpg"
                            }
                          />
                        )}
                        {review?.rating === 2 && (
                          <img
                            style={{ width: "190px" }}
                            src={
                              "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683856058/Two-star-rating-1024x238_uysm6z.png"
                            }
                          />
                        )}
                        {review?.rating === 3 && (
                          <img
                            style={{ width: "190px" }}
                            src={
                              "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683856078/three-stars_0_1_.png_pbu927.png"
                            }
                          />
                        )}
                        {review?.rating === 4 && (
                          <img
                            style={{ width: "190px" }}
                            src={
                              "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683855981/four-stars_01_1_.png_vb8ylt.png"
                            }
                          />
                        )}
                        {review?.rating === 5 && (
                          <img
                            style={{ width: "190px" }}
                            src={
                              "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683855981/5_star_sewzl7.jpg"
                            }
                          />
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="review-comment">{review?.review}</p>

                  {user && reviews && user.id === review.userId ? (
                    <button
                      className="delete-button"
                      id={review?.id}
                      onClick={() => handleDeleteReview(review.id, product.id)}
                    // disabled={!sessionUser}
                    >
                      Delete Review
                    </button>
                  ) : (
                    <br />
                  )}
                </div>
              ))}
          </div>
        </div>
      ) : ("Page not found")}
    </div>
  );
};

export default ProductDetails;
