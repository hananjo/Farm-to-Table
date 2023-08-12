import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getAllProducts } from "../../store/product";
import "./LandingPage.css";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";
import CartAddForm from "../CartAddForm";
import CartQtyForm from "../CartQtyForm";
import DuplicateAdd from "../Duplicate";
import { getCart } from "../../store/cart";
import OwnerAdd from "../Owned";
// import FadeLoader from "react-spinners/FadeLoader";
const Products = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state?.session?.user?.id);
  const sessionUser = useSelector((state) => state?.session?.user);

  const products = useSelector((state) => {
    return Object.values(state?.product);
  });

  useEffect(() => {
    dispatch(getCart(user));
    setIsLoaded(true);
  }, [dispatch, user]);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1900);
  // }, []);
  const cart = useSelector((state) => state.cart);

  const cartArr = Object.values(cart);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const handleAddtoCart = (e, prodId, ownerId) => {
    let isDuplicate = false;
    let cartRel = {};
    // let userId = isLoaded && user.id
    e.preventDefault();

    if (user === ownerId) {
      setModalContent(<OwnerAdd prod={cartRel} fCls={"update"} />);
      openModal();
    } else {
      cartArr.forEach((rel) => {
        if (rel.product_id === prodId && rel.user_id === user) {
          isDuplicate = true;
          cartRel = rel;
        }
      });

      if (isDuplicate) {
        setModalContent(<DuplicateAdd prod={cartRel} fCls={"update"} />);
        openModal();
      } else {
        setModalContent(<CartAddForm id={prodId} fCls={"add"} />);
        openModal();
      }
    }
  };

  return (
    <div>
      <div className="category-container">
        <div className="categories-title">
          <h2>Groceries delivered fresh right to your door!</h2>
        </div>
        <div className="categories-and-names">
          <div className="fruits-nav-container">
            {/* {loading ? (
              <>
                <div className="loader">
                  <FadeLoader color="#eb803d" height={20} width={6} />
                </div>
              </>
            ) : ( */}
            <NavLink to={`/category/Fruit`} style={{ textDecoration: "none" }}>
              <div className="category">
                <img
                  src={
                    "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683739735/Fruits_xat3pu.jpg"
                  }
                  style={{
                    clipPath: "circle(38%)",
                    width: "100px",
                  }}
                  alt="image1"
                  className="image-categories"
                />
                <div className="category-names">
                  <p>Fruits</p>
                </div>
              </div>
            </NavLink>
            {/* )} */}
          </div>
          {/* <div className="veggie-dairy-conatiner"> */}
          <NavLink
            to={`/category/Vegetable`}
            style={{ textDecoration: "none" }}
          >
            <div className="category">
              <img
                src={
                  "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683739735/vegetables_2_qhyckt.jpg"
                }
                style={{ clipPath: "circle(38%)" }}
                alt="image2"
                className="image-categories"
              />
              <div className="category-names">
                <p>Vegetables</p>
              </div>
            </div>
          </NavLink>
          <NavLink to={`/category/Meat`} style={{ textDecoration: "none" }}>
            <div className="category">
              <div className="image-meat">
                <img
                  src={
                    "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683739735/meat_products_jfojgq.jpg"
                  }
                  style={{ clipPath: "circle(38%)", width: "100px" }}
                  alt="image3"
                  className="image-categories"
                />
              </div>
              <div className="category-name-meat">
                <p>Meat</p>
              </div>
            </div>
          </NavLink>
          <NavLink to={`/category/Dairy`} style={{ textDecoration: "none" }}>
            <div className="category">
              <img
                src={
                  "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683739735/dairy_g1nr3q.jpg"
                }
                style={{ clipPath: "circle(38%)" }}
                alt="image4"
                className="image-categories"
              />
              <div className="category-names">
                <p>Dairy</p>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="product-and-pricing">
        {products?.map((product) => {
          const isOwner = product.owner_id === user;
          return (
            <div>
              <NavLink
                key={product.id}
                to={`/products/${product.id}`}
                style={{ textDecoration: "none" }}
                className="product-link"
              >
                <div className="product-image-listing">
                  <img
                    src={
                      product && product.images && product?.images[0]?.image_url
                    }
                    style={{
                      marginRight: "30px",
                      marginBottom: "30px",
                      marginTop: "30px",
                    }}
                    className="product-images"
                  />
                </div>
                <div className="product-pricing-images">
                  ${product.price.toFixed(2)}
                </div>
                <div className="product-add-buttons">
                  {sessionUser && !isOwner ? (
                    <button
                      className="add-to-cart-2"
                      onClick={(e) =>
                        handleAddtoCart(e, product.id, product.owner_id)
                      }
                      style={{
                        clipPath: "circle(40%)",
                      }}
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  ) : sessionUser ? (
                    <div className="your-product-landing">Your product</div>
                  ) : (
                    <br />
                  )}
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
      <div className="landing-footer">
        <div className="social-links-landing-container">
          <div>
            <a href="https://github.com/hananjo/Python-Project-">
              <i class="fa fa-github" aria-hidden="true">
                {" "}
                Farm-To-Table
              </i>
            </a>
          </div>
          <div className="group-members-container">
            <div className="member">
              <div className="member-name">
                <p>Hanan Jomaa</p>
              </div>
              <div className="github-and-linkedin">
                <a href="https://github.com/hananjo">
                  <i class="fa fa-github" aria-hidden="true"></i>
                </a>
                <a href="https://www.linkedin.com/in/hanan-jomaa-94350192/">
                  <i class="fa fa-linkedin-square" aria-hidden="true"></i>
                </a>
                <a href="https://wellfound.com/u/hanan-jomaa">
                  <i class="fa fa-angellist" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div className="member">
              <div className="member-name">
                <p>Laila Denman</p>
              </div>
              <div className="github-and-linkedin">
                <div className="member-github">
                  <a href="https://github.com/Lailadenman">
                    <i class="fa fa-github" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="member-linkedin">
                  <a href="https://www.linkedin.com/in/laila-denman-888968190/">
                    <i class="fa fa-linkedin-square" aria-hidden="true"></i>
                  </a>
                </div>
                <a href="https://wellfound.com/u/laila-denmanf">
                  <i class="fa fa-angellist" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div className="member">
              <div className="member-name">
                <p>David Chu</p>
              </div>
              <div className="github-and-linkedin">
                <a href="https://github.com/Chumean">
                  <i class="fa fa-github" aria-hidden="true"></i>
                </a>
                <a href="https://www.linkedin.com/in/davidchu007/">
                  <i class="fa fa-linkedin-square" aria-hidden="true"></i>
                </a>
                <a href="https://wellfound.com/u/david-chu-30">
                  <i class="fa fa-angellist" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
