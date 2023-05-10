import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
import React from "react";
import {
  getAllProducts,
  getProductDetails,
  // getProductImages,
} from "../../store/product";
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
      <h1>DHT</h1>
      <h2>Groceries delivered right to your door!</h2>
      <div>
        {products?.map((product) => {
          return (
            <div>
              <div>{product.price}</div>
              <div>
                <img
                  src={product.images[0].image_url}
                  style={{
                    width: "200px",
                    // marginLeft: "400px",
                    marginRight: "30px",
                    marginBottom: "30px",
                    marginTop: "30px",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
