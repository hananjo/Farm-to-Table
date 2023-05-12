import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteProduct } from "../../store/product";
import { useDispatch } from "react-redux";
import "./DeleteProductModal.css";
const DeleteProductModal = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const removeProduct = async (e) => {
    e.preventDefault();
    await dispatch(deleteProduct(id));
    closeModal();
    history.push("/");
  };
  return (
    <div className="confirm-delete-container">
      <h2 className="confirm-delete-h2">Delete Product Confirmation</h2>
      <p className="confirm-delete-message">
        Are you sure you want to delete this product?
      </p>

      <div className="product-confirmation-buttons">
        <button className="product-choices" onClick={removeProduct}>
          Yes
        </button>

        <button className="product-choices" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteProductModal;
