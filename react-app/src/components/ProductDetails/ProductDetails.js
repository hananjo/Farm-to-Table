import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import React from "react";
import { deleteProduct, getProductDetails } from "../../store/product";
const ProductDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => {
    return state?.product.details;
  });
  console.log(product, "PRODUCTDeT");
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

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
                  <p> Are you sure you want to remove this group?</p>
                </div>
                <div className="confirmation-delete-buttons">
                  <button className="delete-button" onClick={handleDelete}>
                    Yes (Delete Group)
                  </button>

                  <button className="keep-button" onClick={closeMenu}>
                    No (Keep Group)
                  </button>
                </div>
              </div>
              //   </OpenModalButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
