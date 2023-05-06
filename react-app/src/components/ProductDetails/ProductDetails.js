import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import React from "react";
import { getProductDetails } from "../../store/product";
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
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
