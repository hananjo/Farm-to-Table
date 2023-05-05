import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
import React from "react";
import { getAllProducts } from "../../store/product";
const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    console.log(state.product, "%%%%%");
    return Object.values(state?.product);
  });
  console.log(products, "PRODUCTS***");
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>DHT</h1>
      <h2>Groceries delivered right to your door!</h2>
      <div>
        {products?.map((product) => {
          return <div>{product.price}</div>;
        })}
      </div>
    </div>
  );
};

export default Products;
