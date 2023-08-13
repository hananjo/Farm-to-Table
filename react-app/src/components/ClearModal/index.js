import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import "./Clearmodal.css";
import { checkoutCart } from "../../store/cart";
const ClearModal = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClear = async (e) => {
    e.preventDefault();
    dispatch(checkoutCart(id))
    closeModal();
    // I want this to push to the cart page
    history.push("/cart");
  };

  return (
    <div className="confirm-clear-container">
      <h2 className="confirm-clear-h2">Clear Cart</h2>
      <p className="confirm-clear-message">
        Are you sure you want to clear your cart?
      </p>

      <div className="clear-cart-confirmation-buttons">
        <button className="clear-cart-choices clear-buttons" onClick={handleClear}>
          Yes
        </button>

        <button className="clear-cart-product-choices clear-buttons" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default ClearModal;
