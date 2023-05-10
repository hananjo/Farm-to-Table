import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
import React from "react";
import { getAllProducts } from "../../store/product";
import "./LandingPage.css";
import { NavLink } from "react-router-dom";
const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    console.log(state.product, "%%%%%");
    return Object.values(state?.product);
  });

  // const images = useSelector((state) => {
  //   return Object.values(state?.images);
  // });
  console.log(products, "PRODUCTS***");
  useEffect(() => {
    dispatch(getAllProducts());
    // dispatch(getProductImages());
  }, [dispatch]);

  return (
    <div>
      <div className="category-container">
        <div className="categories-title">
          <h2>Groceries delivered fresh right to your door!</h2>
        </div>
        <div className="categories-and-names">
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
                    src={product?.images[0]?.image_url}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
