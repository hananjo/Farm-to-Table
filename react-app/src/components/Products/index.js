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

const Products = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false)

  const user = useSelector(state => state.session.user.id)

  const products = useSelector((state) => {
    console.log(state.product, "%%%%%");
    return Object.values(state?.product);
  });

  useEffect(() => {
    dispatch(getCart(user));
    setIsLoaded(true)
  }, [dispatch, user])

  const cart = useSelector(state => state.cart)

  const cartArr = Object.values(cart)

  // const images = useSelector((state) => {
  //   return Object.values(state?.images);
  // });
  console.log(products, "PRODUCTS***");
  useEffect(() => {
    dispatch(getAllProducts());
    // dispatch(getProductImages());
  }, [dispatch]);

  const { setModalContent } = useModal();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const handleAddtoCart = (prodId, ownerId) => {
    let isDuplicate = false
    let cartRel = {}


    if (user.id === ownerId) {
      setModalContent(<OwnerAdd prod={cartRel} fCls={"update"} />);
      openModal();
    } else {
      cartArr.forEach((rel) => {
        if (rel.product_id === prodId && rel.user_id === user.id) {
          isDuplicate = true
          cartRel = rel
        }
      })

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
          <NavLink to={`/category/Fruit`}>
            <div className="category">
              <img
                src={
                  "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683739735/Fruits_xat3pu.jpg"
                }
                style={{
                  clipPath: "circle(38%)",
                  width: "310px",
                }}
                alt="image1"
                className="image-categories"
              />
              <div className="category-names">
                <p>Fruits</p>
              </div>
            </div>
          </NavLink>
          <NavLink to={`/category/Vegetable`}>
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
          <NavLink to={`/category/Meat`}>
            <div className="category">
              <div className="image-meat">
                <img
                  src={
                    "https://res.cloudinary.com/dwphwqyrn/image/upload/v1683739735/meat_products_jfojgq.jpg"
                  }
                  style={{ clipPath: "circle(30%)", width: "400px" }}
                  alt="image3"
                  className="image-categories"
                />
              </div>
              <div className="category-name-meat">
                <p>Meat</p>
              </div>
            </div>
          </NavLink>
          <NavLink to={`/category/Dairy`}>
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
          return (
            <div>
              <NavLink
                key={product.id}
                to={`/products/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="product-image-listing">
                  <img
                    src={
                      product && product.images && product?.images[0]?.image_url
                    }
                    style={{
                      // width: "200px",
                      // marginLeft: "400px",
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
              </NavLink>
              <div className="product-add-buttons">
                <button onClick={() => handleAddtoCart(product.id, product.owner_id)}><i class="fa-solid fa-plus"></i></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
